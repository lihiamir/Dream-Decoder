const chatService = require('./chat');
const imageService = require('./image');
const symbolService = require('./symbol');
const tagsService = require('./tags');
const { admin } = require('../config/firebase');

exports.processTextDream = async (uid, text, metadata = {}) => {
  // const rawOutput = prompt;
  const rawOutput = await chatService.extractScenes(text);
  const lines = rawOutput.trim().split('\n');
  const sceneLines = lines.slice(2);
  const scenes = sceneLines.map(line =>
    line.replace(/^\d+\.\s*Scene description \d+:\s*/i, '').trim()
  );

  const { tags }  = await tagsService.extractTagsOnly(scenes);
  const { tagEmbedding } = await tagsService.processDreamTags(tags);

  if (!tagEmbedding || !tagEmbedding.length) {
  console.error('❌ tagEmbedding is undefined or empty – aborting save');
  throw new Error('tagEmbedding calculation failed');
  }

  // משיכת פרופיל המשתמש (לצורך פרשנות)
  const userRef = admin.firestore().collection('users').doc(uid);
  const userSnap = await userRef.get();
  const userProfile = userSnap.exists ? userSnap.data() : {};

  const background = userProfile.background || 'Other';
  const interpretationStyle = userProfile.interpretationStyle || 'Symbolic';

  // פרשנות סמלים (מעבירים גם רקע וסגנון)
  const symbolInterpretations = await symbolService.extractSymbolInterpretations(
    scenes,
    background,
    interpretationStyle
  );

  const db = admin.firestore();
  const dreamDocRef = db.collection('users').doc(uid).collection('dreams').doc();
  const id = dreamDocRef.id;

  const enrichedScenes = [];
  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    const destinationPath = `users/${uid}/dreams/${id}/scene_${i + 1}.png`;
    const imageUrl = await imageService.generateAndUploadImage(scene, destinationPath);
    
    enrichedScenes.push({
      scene,
      image: imageUrl,
      symbols: symbolInterpretations[i].symbols
    });
  }

  const dreamData = {
    ...metadata,
    parsedText: text,
    tags,
    tagEmbedding,
    scenes: enrichedScenes,
    createdAt: new Date()
  };

  await dreamDocRef.set(dreamData);

  return {
    id,
    scenes: enrichedScenes
  };
};

exports.getAllDreams = async (uid) => {
  const db = admin.firestore();
  const dreamsRef = db.collection('users').doc(uid).collection('dreams');

  const snapshot = await dreamsRef.orderBy('createdAt', 'desc').get();

  const dreams = snapshot.docs.map(doc => {
    const data = doc.data();
    const firstImage = data.scenes?.[0]?.image || null;

    return {
      id: doc.id,
      createdAt: data.createdAt ? data.createdAt.toDate() : null,
      image: firstImage,
      tags: data.tags || []
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
    scenes: dreamDoc.data().scenes  || []
  };
};