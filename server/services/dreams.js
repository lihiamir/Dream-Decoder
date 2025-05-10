const speechService = require('./speech');
const chatService = require('./chat');
const imageService = require('./image');
const symbolService = require('./symbol');
const admin = require('../config/firebase');


const prompt = `Number of scenes: 4

1. Scene description 1: A woman standing in fields of wheat under a clear sky.
2. Scene description 2: Multiple rabbits hopping in and around the fields of wheat, with the woman observing.
3. Scene description 3: The woman sitting beside a laptop in an outdoor setting (within the wheat fields), coding/programming.
4. Scene description 4: The woman excitedly receiving an acceptance letter with a logo of "Indolinia" company, the wheat fields in the background.`;

// const text = "אני רק חולמת לראות שזה מתרגם לי את החלום כמו שצריך אז אני חולמת שאני בשדות של טוטים עם ערנבים ליד מתכנתת ומתקבלת לחברת אינדוליניה."


  exports.processTextDream = async (uid, text, metadata = {}) => {
    // const rawOutput = prompt;
    const rawOutput = await chatService.extractScenes(text); 
    const lines = rawOutput.trim().split('\n');
    const sceneLines = lines.slice(2);
    const scenes = sceneLines.map(line => line.replace(/^\d+\.\s*/, ''));
    const imageUrls = [];   
    for (let i = 0; i < scenes.length; i++) {
        const scene = scenes[i];
        const imageUrl = await imageService.generateImageUrl(scene);
        console.log(imageUrl, "URL");
        imageUrls.push(imageUrl);
      }
    

    await saveDreamForUser(uid, {
      ...metadata,
      parsedText: text,
      scenes,
      images: imageUrls,
      // Store the current date and time when the dream was created
      createdAt: new Date()
    });
    // const symbols = await symbolService.extractSymbols(text);
  
    return scenes;
};

const saveDreamForUser = async (uid, dreamData) => {
  const db = admin.firestore();
  const userDreamsRef = db.collection('users').doc(uid).collection('dreams');
  await userDreamsRef.add(dreamData); // ← THIS creates a unique document with auto-ID
};

exports.getAllDreams = async (uid) => {
  const db = admin.firestore();
  const dreamsRef = db.collection('users').doc(uid).collection('dreams');

  const snapshot = await dreamsRef.orderBy('createdAt', 'desc').get();

  const dreams = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return dreams;
};