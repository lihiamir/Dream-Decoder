const admin = require('firebase-admin');
const { cosineSimilarity } = require('./tags'); 
const { TAG_SIMILARITY_THRESHOLD } = require('../config/constants');

exports.getRecommendedDreamsForUser = async (uid, dreamId) => {
  const db = admin.firestore();
  const userDreamsRef = db.collection("users").doc(uid).collection("dreams");

  // Get the selected dream
  const dreamDoc = await userDreamsRef.doc(dreamId).get();
  if (!dreamDoc.exists) {
    throw new Error("Dream not found");
  }

  const targetEmbedding = dreamDoc.data().tagEmbedding;
  if (!targetEmbedding) {
    throw new Error("Dream has no embedding");
  }

  const snapshot = await userDreamsRef.get();
  const similarities = [];

  snapshot.forEach(doc => {
    // Skip current dream
    if (doc.id === dreamId) return;
    const data = doc.data();
    if (data.tagEmbedding) {
        const score = cosineSimilarity(targetEmbedding, data.tagEmbedding);
        // Add only if similarity is above threshold
        if (score >= TAG_SIMILARITY_THRESHOLD) {
        similarities.push({
          id: doc.id,
          score,
          image: data.scenes?.[0]?.image || null,
        });
      }
    }
  });
  // Sort by highest similarity first
  similarities.sort((a, b) => b.score - a.score);
  // Return only id and image
  return similarities.map(({ id, image }) => ({ id, image }));
};
