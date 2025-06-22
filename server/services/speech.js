require('dotenv').config();
const fs = require('fs');
const { OpenAI } = require('openai');

// Transcribes Hebrew audio file using OpenAI Whisper
exports.transcribeAudio = async (audioPath) =>  {
    try {
      const stats = fs.statSync(audioPath);
      console.log('File size:', stats.size);
      if (!fs.existsSync(audioPath)) {
        console.error('Audio file not found');
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
      console.error('Transcription error:', error.message);
    }
  }


