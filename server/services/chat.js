require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt = `
You are a dream analysis assistant.  
Break down the following dream into between 2 and 6 distinct visual scenes.  
Each scene should be clear, concrete, and suitable for image generation (e.g., using DALL·E).  

Format your response exactly as follows (with no extra text or explanation):

Number of scenes: X

1. Scene description 1  
2. Scene description 2  
...

Use only information present in the dream.  
Avoid interpretation, metaphors, or abstract concepts unless they can be visualized.  
Do not add any text before or after the list.
`;

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

    // console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
  }
}

exports.findMissingSymbolsFromGPT = async (sceneText, knownSymbols = []) => {
  const systemPrompt = `
  You are a dream symbol analysis assistant.
  You are given a dream scene and a list of known symbols that were already extracted from it.
  Your task is to identify up to 5 additional symbolic elements (objects, animals, places, emotions, etc.) in the scene that are NOT already included in the known symbols.
  If no additional meaningful symbols are clearly present in the scene, return an empty JSON array: []
  Do not invent or guess.
  Only include real, meaningful symbols that clearly appear in the scene.
  For each symbol, return:
  - symbol (a single word or short phrase)
  - meanings: { positive, negative, neutral }
  Return as a JSON array. Only include truly symbolic elements. Do not include known ones.
  `;

  const userPrompt = `
  Scene: ${sceneText}
  
  Known symbols: ${knownSymbols.join(', ') || "None"}
  `;

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
    console.error("❌ Failed to parse GPT response:", err.message);
    return [];
  }
};

