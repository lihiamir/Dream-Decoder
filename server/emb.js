const { admin } = require('./config/firebase');
const { processDreamTags } = require('./services/tags');
require('dotenv').config();

async function updateTagEmbeddingForDream(uid, dreamId, tags) {
  if (!uid || !dreamId || !Array.isArray(tags) || tags.length === 0) {
    console.error('Missing or invalid input. Please provide uid, dreamId, and a non-empty tags array.');
    return;
  }

  try {
    console.log(`🔄 Processing embedding for UID: ${uid}, Dream ID: ${dreamId}`);
    const { tagEmbedding } = await processDreamTags(tags);

    if (!tagEmbedding || tagEmbedding.length === 0) {
      throw new Error('Failed to generate valid embedding.');
    }

    const db = admin.firestore();
    const dreamRef = db.collection('users').doc(uid).collection('dreams').doc(dreamId);

    await dreamRef.update({ tagEmbedding });

    console.log('tagEmbedding successfully updated in Firestore.');
  } catch (error) {
    console.error('Error updating tagEmbedding:', error.message);
  }
}

const uid = '94ixwXPd9EggX2gpznwfeE61FQs1';
const dreamId = '8r5iCxCi7WXA95yZNxai';
const tags = [
  "unreal forest",
  "glowing moonlight",
  "dragon",
  "robot",
  "NVIDIA",
  "dream box",
  "flying",
  "clouds",
  "upside-down city",
  "dreams",
  "crystals",
  "awakening",
  "blue feather"
];

updateTagEmbeddingForDream(uid, dreamId, tags);
