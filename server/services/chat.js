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

exports.extractScenes = async(dreamText) => {
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
  
