const admin = require('firebase-admin');
const { cosineSimilarity } = require('./tags'); // מניח ששם הפונקציה שלך

const THRESHOLD = 0.75;

exports.getRecommendedDreamsForUser = async (uid, dreamId) => {
  const db = admin.firestore();
  const userDreamsRef = db.collection("users").doc(uid).collection("dreams");

  const dreamDoc = await userDreamsRef.doc(dreamId).get();
  if (!dreamDoc.exists) {
    throw new Error("Dream not found");
  }

  const targetEmbedding = dreamDoc.data().meanEmbedding;
  if (!targetEmbedding) {
    throw new Error("Dream has no embedding");
  }

  const snapshot = await userDreamsRef.get();
  const similarities = [];

  snapshot.forEach(doc => {
    if (doc.id === dreamId) return;
    const data = doc.data();
    if (data.meanEmbedding) {
      const score = cosineSimilarity(targetEmbedding, data.meanEmbedding);
      if (score >= THRESHOLD) {
        similarities.push({
          id: doc.id,
          score,
          image: data.scenes?.[0]?.image || null,
        });
      }
    }
  });

  similarities.sort((a, b) => b.score - a.score);
  return similarities.map(({ id, image }) => ({ id, image }));
};
