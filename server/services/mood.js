// moodService.js
require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function classifyDreamMood(scenes) {
    const systemPrompt = `
    You are an assistant for analyzing dream scenes.
    
    Given a list of dream scenes:
    1. Classify the emotional tone of each scene as one of: "positive", "negative", or "neutral"
    2. Determine the overall emotional tone of the full dream (dreamMood)
    3. Extract 5–8 key tags that summarize the dream's content.
       Tags may include:
       - visual symbols (e.g., "rabbit", "mirror", "darkness")
       - emotional tones (e.g., "fear", "peace", "joy")
       - abstract themes (e.g., "isolation", "freedom", "acceptance")
    
    Return the result as JSON in this exact format:
    {
      "dreamMood": "positive",
      "sceneMoods": ["neutral", "positive", "negative"],
      "tags": ["rabbit", "field", "freedom", "acceptance", "joy"]
    }
    `;

    const userPrompt = `Scenes:\n` + scenes.map((s, i) => `${i + 1}. ${s}`).join('\n');

    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ]
    });

    const raw = completion.choices[0].message.content;
    try {
        return JSON.parse(raw);
    } catch (error) {
        console.error("❌ Failed to parse GPT response:", raw);
        throw new Error("Invalid JSON from GPT");
    }};

module.exports = {
    classifyDreamMood
};
