const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Analyzes the user's dream and determines whether clarification is needed
exports.analyzeDreamForClarifications = async (text) => {
  try {
    const prompt = `
You are an assistant analyzing dream content.
Given the following dream, determine whether it contains unclear references to people, places that may require clarification.

If yes, return 1–3 short, neutral follow-up questions to ask the user.

Only return JSON in the following format:
{
  "needsFollowUp": true,
  "questions": ["..."]
}
If the dream is clear and needs no clarification, return:
{
  "needsFollowUp": false
}

Dream:
"""${text}"""
    `.trim();

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a dream clarification assistant.' },
        { role: 'user', content: prompt }
      ],
      // Low randomness to keep questions consistent
      temperature: 0.3, 
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);

  } catch (error) {
    console.error("Clarification analysis error:", error.message);
    return { needsFollowUp: false };
  }
};

// Parse clarifications into a structured object
exports.parseClarifications = async (text) => {
    try {
      const prompt = `
  Extract named clarifications from the following text and return them as a JSON object.
  Each key should be a name or reference mentioned, and each value should be the user's clarification or explanation.
  
  Example output format:
  {
    "דנה": "חברה שלי מהעבודה",
    "יוסי": "המורה למתמטיקה"
  }
  
  Only return the JSON. No extra commentary.
  
  Text:
  """${text}"""
      `.trim();
  
      const response = await openai.chat.completions.create({
        model: 'gpt-4-1106-preview', 
        messages: [
          { role: 'system', content: 'You are a helpful assistant that extracts clarifications as JSON.' },
          { role: 'user', content: prompt }
        ],
        // Keep responses consistent and structured
        temperature: 0.2, 
      });
  
      const content = response.choices[0].message.content;
      return JSON.parse(content);
  
    } catch (error) {
      console.error("Error parsing clarifications:", error.message);
      return {};
    }
  };
