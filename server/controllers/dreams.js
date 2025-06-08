const dreamsService = require('../services/dreams');
const speechService = require('../services/speech');
const clarificationService = require('../services/clarification');
const recommendationsService = require('../services/recommendation');

// Handles dream submission (from either audio or text)
exports.submitDream = async(req, res) => {
  const uid = req.uid;

  try {
    // Extract the dream text (from file or body)
    const text = await getDreamText(req);

    // Check if clarifications are needed (unclear names, etc.)
    const clarificationResult = await checkForClarifications(text);

    if (clarificationResult.followUp) {
      // If needed, send follow-up questions to client
      return res.status(200).json({
        followUp: true,
        questions: clarificationResult.questions,
        originalText: text,
      });
    }

    //Else process dream normally (generate scenes, images)
    const result = await dreamsService.processTextDream(uid, text);
    res.status(200).json({ followUp: false, ...result });

  } catch (error) {
    console.error("❌ Error in submitDream:", error);
    res.status(500).json({ error: error.message });
  }
};

// Handles user's clarifications after follow-up questions
exports.clarifyDream = async(req, res) => {
  const uid = req.uid;
  
  // This is the original dream text (before user clarifications), not the clarification response
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: 'Missing original dream text' });

  try {
    // Get clarification answers (from audio or text)
    const clarificationsText = await getClarificationsText(req);

    // Parse clarifications into a structured object
    const clarifications = await clarificationService.parseClarifications(clarificationsText);

    // Combine original dream with clarifications
    const enrichedText = `${text}\n\nUser clarifications:\n` + 
      Object.entries(clarifications)
        .map(([key, value]) => `- ${key}: ${value}`)
        .join('\n');

    // Process the enriched dream (with added context)
    const result = await dreamsService.processTextDream(uid, enrichedText, {
      originalText: text,
      clarifications
    });

    res.status(200).json(result);

  } catch (error) {
    console.error("❌ Error in clarifyDream:", error);
    res.status(500).json({ error: error.message });
  }
};

// Extracts dream text from request (audio or text input)
async function getDreamText(req) {
  if (req.file) {
    const path = req.file.path;
    const text = await speechService.transcribeAudio(path);

    return text;
  }

  if (req.body.text) {
    return req.body.text;
  }

  throw new Error('Missing dream input');
}

// Extracts clarification text from request (audio or text input)
async function getClarificationsText(req) {
  const combinedAnswers = [];

  for (let i = 0; i < 3; i++) {
    const type = req.body[`answer_${i}_type`];

    if (!type) continue;

    if (type === "text" && req.body[`answer_${i}_text`]) {
      combinedAnswers.push(`Answer ${i + 1}: ${req.body[`answer_${i}_text`]}`);
    }

    if (type === "audio") {
      const file = req.files.find(f => f.fieldname === `answer_${i}_audio`);
      if (file) {
        const text = await speechService.transcribeAudio(file.path);
        combinedAnswers.push(`Answer ${i + 1}: ${text}`);
      }
    }
  }

  if (combinedAnswers.length === 0) {
    throw new Error("Missing clarifications input");
  }

  return combinedAnswers.join('\n');
}

// Checks if the submitted dream needs follow-up questions
async function checkForClarifications(text) {
  const { needsFollowUp, questions } = await clarificationService.analyzeDreamForClarifications(text);

  if (needsFollowUp) {
    return { followUp: true, questions };
  }

  return { followUp: false };
}

exports.getAllDreams = async (req, res) => {
  const uid = req.uid;
  if (!uid) return res.status(400).json({ error: "Missing user ID" });

  try {
    const dreams = await dreamsService.getAllDreams(uid);
    res.status(200).json(dreams);
  } catch (error) {
    console.error("❌ Error fetching user dreams:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getDreamById = async (req, res) => {
  const { uid } = req.user;
  const { dreamId } = req.params;

  try {
    const dream = await dreamsService.getDreamById(uid, dreamId);

    if (!dream) {
      return res.status(404).json({ error: 'Dream not found' });
    }

    res.json(dream);
  } catch (error) {
    console.error('Error fetching dream:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getRecommendedDreams = async (req, res) => {
  const uid = req.user.uid;
  const { dreamId } = req.params;

  try {
    const recommendations = await recommendationsService.getRecommendedDreamsForUser(uid, dreamId);
    res.json({ recommendations });
  } catch (err) {
    console.error("❌ Error fetching recommended dreams:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};