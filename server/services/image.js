const { OpenAI } = require("openai");
const axios = require("axios");
const admin = require('../config/firebase');
const fs = require("fs");
const path = require("path");


const bucket = admin.storage().bucket();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateAndUploadImage(prompt, fileName) {
  try {
    // שלב 1: יצירת תמונה
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url;

    // שלב 2: הורדת תמונה לקובץ זמני
    const localPath = path.join(__dirname, `${fileName}.png`);
    const imageResponse = await axios.get(imageUrl, { responseType: "stream" });
    const writer = fs.createWriteStream(localPath);

    await new Promise((resolve, reject) => {
      imageResponse.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    // שלב 3: העלאה ל־Firebase Storage
    const uploadResponse = await bucket.upload(localPath, {
      destination: `dream-images/${fileName}.png`,
      metadata: {
        contentType: "image/png",
      },
    });

    // שלב 4: יצירת URL ציבורי
    const file = uploadResponse[0];
    await file.makePublic(); // (אפשר גם להשתמש ב-Token אם לא רוצה שהכול יהיה ציבורי)

    // שלב 5: מחיקת קובץ זמני מקומי (לא חובה)
    fs.unlinkSync(localPath);

    return file.publicUrl();
  } catch (error) {
    console.error("❌ שגיאה:", error.message);
  }