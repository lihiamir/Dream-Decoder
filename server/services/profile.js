const { admin } = require('../config/firebase');

exports.saveInterpretationProfile = async (uid, data) => {
  const userRef = admin.firestore().collection('users').doc(uid);
  const existingDoc = await userRef.get();
  const existingData = existingDoc.exists ? existingDoc.data() : {};

  // 🧠 האם זו הפעם הראשונה שהמשתמש ממלא הגדרות?
  const isInitialSetup = !('background' in existingData) && !('interpretationStyle' in existingData);

  const profileData = {};

  // 🔁 ערכים שמגיעים מהפרונט – רק אם נשלחו
  if (data.background !== undefined) profileData.background = data.background;
  if (data.interpretationStyle !== undefined) profileData.interpretationStyle = data.interpretationStyle;

  // 🛡️ אם זו הפעם הראשונה – לקבוע ערכי ברירת מחדל
  if (isInitialSetup) {
    if (!profileData.background) profileData.background = 'Other'; // ← ללא עדה או דת מסוימת
    if (!profileData.interpretationStyle) profileData.interpretationStyle = 'Symbolic'; // ← פרשנות כללית
  }

  profileData.completedAt = new Date();

  // 🧷 merge כדי לא לדרוס שדות אחרים
  await userRef.set(profileData, { merge: true });
};
