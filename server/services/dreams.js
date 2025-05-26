const chatService = require('./chat');
const imageService = require('./image');
const symbolService = require('./symbol');
const moodService = require('./mood');
const { admin } = require('../config/firebase');

const prompt = `Number of scenes: 4

1. Scene description 1: A woman standing in fields of wheat under a clear sky.
2. Scene description 2: Multiple rabbits hopping in and around the fields of wheat, with the woman observing.
3. Scene description 3: The woman sitting beside a laptop in an outdoor setting (within the wheat fields), coding/programming.
4. Scene description 4: The woman excitedly receiving an acceptance letter with a logo of "Indolinia" company, the wheat fields in the background.`;

// const text = "אני רק חולמת לראות שזה מתרגם לי את החלום כמו שצריך אז אני חולמת שאני בשדות של טוטים עם ערנבים ליד מתכנתת ומתקבלתב לחברת אינדוליניה."

exports.processTextDream = async (uid, text, metadata = {}) => {
  // const rawOutput = prompt;
  const rawOutput = await chatService.extractScenes(text);
  const lines = rawOutput.trim().split('\n');
  const sceneLines = lines.slice(2);
  const scenes = sceneLines.map(line => line.replace(/^\d+\.\s*/, ''));

  const { dreamMood, sceneMoods, tags } = await moodService.classifyDreamMood(scenes);
  const symbolInterpretations = await symbolService.extractSymbolInterpretations(scenes, sceneMoods);

  const db = admin.firestore();
  const dreamDocRef = db.collection('users').doc(uid).collection('dreams').doc();
  const dreamId = dreamDocRef.id;

  const enrichedScenes = [];
  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    const destinationPath = `users/${uid}/dreams/${dreamId}/scene_${i + 1}.png`;
    const imageUrl = await imageService.generateAndUploadImage(scene, destinationPath);
    
    enrichedScenes.push({
      scene,
      image: imageUrl,
      mood: symbolInterpretations[i].mood,
      symbols: symbolInterpretations[i].symbols
    });
  }

  const dreamData = {
    ...metadata,
    parsedText: text,
    dreamMood,
    tags,
    scenes: enrichedScenes,
    createdAt: new Date()
  };

  await dreamDocRef.set(dreamData);

  return {
    dreamId,
    scenes: enrichedScenes
  };
}

exports.getAllDreams = async (uid) => {
  const db = admin.firestore();
  const dreamsRef = db.collection('users').doc(uid).collection('dreams');

  const snapshot = await dreamsRef.orderBy('createdAt', 'desc').get();

  const dreams = snapshot.docs.map(doc => {
    const data = doc.data();
    const firstImage = data.scenes?.[0]?.image || null;

    return {
      id: doc.id,
      createdAt: data.createdAt || null,
      image: firstImage
    };
  });

  return dreams;
};

exports.getDreamById = async (uid, dreamId) => {
  const dreamRef = admin
    .firestore()
    .collection('users')
    .doc(uid)
    .collection('dreams')
    .doc(dreamId);

  const dreamDoc = await dreamRef.get();

  if (!dreamDoc.exists) {
    return null;
  }

  return {
    id: dreamDoc.id,
    scenes: dreamDoc.data().scenes || []
  };
};