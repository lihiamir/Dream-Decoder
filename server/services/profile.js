const { admin } = require('../config/firebase');

exports.saveInterpretationProfile = async (uid, data) => {
  const userRef = admin.firestore().collection('users').doc(uid);
  const existingDoc = await userRef.get();
  const existingData = existingDoc.exists ? existingDoc.data() : {};

  // Check if this is the user's first time setting a profile
  const isInitialSetup = !('background' in existingData) && !('interpretationStyle' in existingData);

  const profileData = {};

  // Only add fields if the frontend sent them
  if (data.background !== undefined) profileData.background = data.background;
  if (data.interpretationStyle !== undefined) profileData.interpretationStyle = data.interpretationStyle;

  // If first-time setup and values are missing, use defaults
  if (isInitialSetup) {
    if (!profileData.background) profileData.background = 'Other'; 
    if (!profileData.interpretationStyle) profileData.interpretationStyle = 'Symbolic';
  }

  profileData.completedAt = new Date();

  // Use merge to avoid removing other fields in the document
  await userRef.set(profileData, { merge: true });
};
