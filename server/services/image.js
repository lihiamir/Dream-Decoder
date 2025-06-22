const { OpenAI } = require("openai");
const { bucket } = require('../config/firebase');
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

// Main function that generates an image from a prompt and uploads it to Firebase Storage
exports.generateAndUploadImage = async (prompt, destinationPath) => {
  try {
    const imageUrl = await generateImageFromPrompt(prompt);
    const tempPath = await downloadImageToTemp(imageUrl);
    const signedUrl = await uploadToFirebaseAndGetSignedUrl(tempPath, destinationPath);
    return signedUrl;
  } catch (error) {
    console.error("Error generating/uploading image:", error.message);
    return null;
  }
};

// Sends the prompt to OpenAI (DALL·E 3) and receives image URL
const generateImageFromPrompt = async (prompt) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1024x1024",
  });
  return response.data[0].url;
};

// Downloads image from URL and saves it temporarily on disk
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

// Uploads the local image file to Firebase Storage and returns a signed URL
const uploadToFirebaseAndGetSignedUrl = async (localPath, destinationPath) => {
  // Token required to generate public download URL
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

  // Clean up local temp file
  fs.unlinkSync(localPath);

  // Return signed URL for public access
  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(destinationPath)}?alt=media&token=${token}`;
};


