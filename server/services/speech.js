require('dotenv').config();
const fs = require('fs');
const { OpenAI } = require('openai');

exports.transcribeAudio = async (audioPath) =>  {
    try {
      const stats = fs.statSync(audioPath);
      console.log('📦 File size:', stats.size);
      // console.log(audioFile, "p");
      if (!fs.existsSync(audioPath)) {
        console.error('❌ ');
        return;
      }
      const audioFile = fs.createReadStream(audioPath);
      
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const response = await openai.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-1',
        language: 'he'
      });
  
      console.log(response.text);
      return response.text;
    } catch (error) {
      console.error('❌ Transcription error:', error.message);
    }
  }


