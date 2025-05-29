const { OpenAI } = require("openai");
const { bucket } = require('../config/firebase');
const path = require("path");
const fs = require("fs");
const axios = require("axios");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.generateAndUploadImage = async (prompt, destinationPath) => {
  try {
    const imageUrl = await generateImageFromPrompt(prompt);
    const tempPath = await downloadImageToTemp(imageUrl);
    const signedUrl = await uploadToFirebaseAndGetSignedUrl(tempPath, destinationPath);
    return signedUrl;
  } catch (error) {
    console.error("❌ שגיאה ביצירת/העלאת תמונה:", error.message);
    return null;
  }
};

const generateImageFromPrompt = async (prompt) => {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1024x1024",
  });
  return response.data[0].url;
};

const downloadImageToTemp = async (url) => {
  const tempName = `temp_${Date.now()}_${Math.random().toString(36).slice(2)}.png`;
  const localPath = path.join(__dirname, tempName);
  const imageResponse = await axios.get(url, { responseType: "stream" });
  const writer = fs.createWriteStream(localPath);

  await new Promise((resolve, reject) => {
    imageResponse.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
  return localPath;
};

const uploadToFirebaseAndGetSignedUrl = async (localPath, destinationPath) => {
  const token = uuidv4(); 

  const [file] = await bucket.upload(localPath, {
    destination: destinationPath,
    metadata: {
      contentType: "image/png",
      metadata: {
        firebaseStorageDownloadTokens: token, 
      },
    },
  });

  fs.unlinkSync(localPath);

  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(destinationPath)}?alt=media&token=${token}`;
};


