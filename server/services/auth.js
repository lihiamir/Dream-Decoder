const { admin } = require('../config/firebase');

exports.registerUser = async (token) => {
    const decoded = await this.verifyToken(token);
    const uid = decoded.uid;
    const email = decoded.email;
    const displayName = decoded.name || null;
    const userData = {
      uid,
      email,
      displayName,
      createdAt: new Date()
    };
    await this.saveUserToFirestore(userData);
    return userData;
};

exports.saveUserToFirestore = async(userData) => {
  const db = admin.firestore();
  const usersCollection = db.collection('users');

  await usersCollection.doc(userData.uid).set(userData, { merge: true });
}

exports.verifyToken = async (idToken) => {
  return await admin.auth().verifyIdToken(idToken);
};

exports.loginUser= async (token) => {
  const decoded = await this.verifyToken(token);
  return {
    uid: decoded.uid,
    email: decoded.email,
    displayName: decoded.name || null
  };
}

exports.getUserDisplayName = async (uid) => {
  const userDoc = await admin.firestore().collection('users').doc(uid).get();

  if (!userDoc.exists) return null;

  const userData = userDoc.data();
  return userData.displayName || null;
};