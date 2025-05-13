const { OpenAI } = require("openai");
const { bucket } = require('../config/firebase');

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

const downloadImageToTemp = async (url, fileName = "temp.png") => {
  const localPath = path.join(__dirname, fileName);
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
  const [file] = await bucket.upload(localPath, {
    destination: destinationPath,
    metadata: { contentType: "image/png" },
  });

  const [signedUrl] = await file.getSignedUrl({
    action: 'read',
    expires: Date.now() + 24 * 60 * 60 * 1000,
  });

  fs.unlinkSync(localPath);
  return signedUrl;
};


