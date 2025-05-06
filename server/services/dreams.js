const speechService = require('./speech');
const chatService = require('./chat');
const imageService = require('./image');
const symbolService = require('./symbol');

exports.processTextDream = async (text) => {
    // const scenes = await chatService.extractScenes(text);
    // const symbols = await symbolService.extractSymbols(text);
    // const images = await imageService.generateImages(scenes);
  
    // return { scenes, images, symbols };
    return;
};
  
exports.processVoiceDream = async (audioPath) => {
    const transcribedText = await speechService.transcribeAudio(audioPath);
    return transcribedText;
    // return await this.processTextDream(transcribedText);
};