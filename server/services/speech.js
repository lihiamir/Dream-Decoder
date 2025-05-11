require('dotenv').config();
const fs = require('fs');
const { OpenAI } = require('openai');


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.transcribeAudio = async (audioPath) =>  {
    try {
      const stats = fs.statSync(audioPath);
      console.log('📦 ', stats.size);
      const audioFile = fs.createReadStream(audioPath);
      // console.log(audioFile, "p");
      if (!fs.existsSync(audioPath)) {
        console.error('❌ ');
        return;
      }
      const response = await openai.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-1',
        language: 'he', // עברית
      });
  
      console.log(response.text);
      return response.text;
    } catch (error) {
      console.error('שגיאה בתמלול:', error.message);
    }
  }

// async function run() {
// const models = await openai.models.list();
// console.log("S" + models.data.length + " P");

// }
// run();
// transcribeAudio('../server/audio.mp3');

