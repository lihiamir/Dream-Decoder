const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.generateImageUrl = async (prompt) => {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url;
    return imageUrl;
  } catch (error) {
    console.error("❌ שגיאה ביצירת תמונה:", error.message);
    return null;
  }
}
