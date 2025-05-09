const dreamsService = require('../services/dreams');

exports.text = async (req, res) => {
    const {text} = req.body;
    const uid = req.uid; 
    if (!text) return res.status(400).json({ error: 'Missing text' });
    try {
        const result = await dreamsService.processTextDream(uid, text);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

exports.voice = async (req, res) => {
    const file = req.file;
    const uid = req.uid; 
    if (!file) return res.status(400).json({ error: 'Missing audio file' });
  
    try {
      const result = await dreamsService.processVoiceDream(uid, file.path);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.submitDream = async (req, res) => {
  const uid = req.uid;

  try {
    const text = await getDreamText(req);
    const clarificationResult = await checkForClarifications(text);

    if (clarificationResult.followUp) {
      return res.status(200).json({
        followUp: true,
        questions: clarificationResult.questions,
        originalText: text,
      });
    }

    const result = await dreamsService.processTextDream(uid, text);
    res.status(200).json({ followUp: false, ...result });

  } catch (error) {
    console.error("❌ Error in submitDream:", error);
    res.status(500).json({ error: error.message });
  }
};

async function getDreamText(req) {
  if (req.file) {
    const path = req.file.path;
    const text = await dreamsService.processVoiceDream(uid, path);

    return text;
  }

  if (req.body.text) {
    return await dreamsService.processTextDream(uid, text);;
  }

  throw new Error('Missing dream input');
}

async function checkForClarifications(text) {
  const { needsFollowUp, questions } = await analyzeDreamForClarifications(text);

  if (needsFollowUp) {
    return { followUp: true, questions };
  }

  return { followUp: false };
}