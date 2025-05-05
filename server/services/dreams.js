const speechService = require('./speech');
const chatService = require('./chatService');
const imageService = require('./imageService');
const symbolService = require('./symbolService');

exports.processTextDream = async (text) => {
    const scenes = await chatService.extractScenes(text);
    const symbols = await symbolService.extractSymbols(text);
    const images = await imageService.generateImages(scenes);
  
    return { scenes, images, symbols };
};
  
exports.processVoiceDream = async (audioPath) => {
    const transcribedText = await speechService.transcribeAudio(audioPath);
    return await this.processTextDream(transcribedText);
};