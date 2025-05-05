const fs = require('fs');
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function transcribeAudio(audioPath) {
    try {
      const audioFile = fs.createReadStream(audioPath);
  
      const response = await openai.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-1',
        language: 'he', // עברית
      });
  
      console.log('תמלול הקובץ:');
      console.log(response.text);
    } catch (error) {
      console.error('שגיאה בתמלול:', error.message);
    }
  }
  
  transcribeAudio('./audio.ogg');