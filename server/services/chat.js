require('dotenv').config();
const { OpenAI } = require('openai');

// Initialize OpenAI client using API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt used to instruct GPT to extract visual scenes from a dream
const prompt = `
You are a dream analysis assistant.  
Break down the following dream into between 2 and 6 distinct visual scenes. 
Scenes must be suitable for image generation with DALL·E.  
You may include events involving injury or fear, but describe them symbolically or gently.  
Avoid graphic words like “blood”, “dead”, “explosion”, etc.  
Use artistic or dreamlike language to express intense moments safely.

Format your response exactly as follows (with no extra text or explanation):

Number of scenes: X

1. Scene description 1  
2. Scene description 2  
...

Use only information present in the dream.  
Avoid interpretation, metaphors, or abstract concepts unless they can be visualized.  
Do not add any text before or after the list.
`;

// Extracts visual scenes from raw dream text
exports.extractScenes = async (dreamText) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: `Dream text: ${dreamText}`,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Extracts symbolic elements from a single dream scene, based on user background and interpretation style
exports.findSymbolsFromGPT = async (sceneText, background, interpretationStyle) => {
  const systemPrompt = `
    You are a dream symbol interpretation assistant. 
    Given a single dream scene, your job is to extract up to 5 meaningful symbolic elements from it.

    Each symbol must include:
    - symbol: a short word or phrase
    - meaning: a concise symbolic meaning (MAX 1 sentence, clear and specific).
      It must be adapted to the user's cultural or spiritual background and preferred interpretation style.

    Guidelines:
    - Avoid vague or overly generic phrases.
    - Interpret each symbol meaningfully, using 1–2 complete, specific sentences.
    - Do NOT invent symbols that do not appear in the scene.
    - Symbols may include animals, objects, natural forces, emotions, or symbolic actions.

    Context:
    User background: ${background}
    Interpretation style: ${interpretationStyle}

    Return a **valid JSON array** like:
    [
      { "symbol": "rabbit", "meaning": "The rabbit represents vulnerability and the need to stay alert in unfamiliar situations." },
      ...
    ]
      `.trim();

  const userPrompt = `Scene: ${sceneText}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ]
  });

  try {
    const content = completion.choices[0].message.content.trim();
    return JSON.parse(content);
  } catch (err) {
    console.error("Failed to parse GPT response:", err.message);
    return [];
  }
};
