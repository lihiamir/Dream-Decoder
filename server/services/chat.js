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
  const systemPrompt = `You are a dream symbol analysis assistant. You are given a dream scene and a list of known symbols that were already extracted from it. Your task is to identify up to 5 additional classic dream symbols that are commonly interpreted in dream analysis traditions, such as animals, emotions, archetypal themes, natural elements, symbolic actions, mythological or spiritual imagery. Do not include mundane or overly literal elements (e.g. furniture, tools, clothing) unless they clearly carry symbolic meaning. Colors may be included only if they are symbolically meaningful in the dream's context. For each symbol, return: - symbol (a short word or phrase) - meanings: { positive, neutral, negative }, where each value is 1–2 complete, thoughtful sentences. Avoid vague or shallow phrasing. If no valid symbols are found, return []. Respond only with valid JSON.`;

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

