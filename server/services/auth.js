const { admin } = require('../config/firebase');

// Registers a new user based on the decoded token
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

// Saves or updates the user data in Firestore (merge avoids overwriting other fields)
exports.saveUserToFirestore = async(userData) => {
  const db = admin.firestore();
  const usersCollection = db.collection('users');

  await usersCollection.doc(userData.uid).set(userData, { merge: true });
}

// Verifies the Firebase ID token and returns the decoded info
exports.verifyToken = async (idToken) => {
  return await admin.auth().verifyIdToken(idToken);
};

// Logs in the user by verifying the token and returning basic user info
exports.loginUser= async (token) => {
  const decoded = await this.verifyToken(token);
  return {
    uid: decoded.uid,
    email: decoded.email,
    displayName: decoded.name || null
  };
}

// Return the user's display name from Firestore
exports.getUserDisplayName = async (uid) => {
  const userDoc = await admin.firestore().collection('users').doc(uid).get();

  if (!userDoc.exists) return null;

  const userData = userDoc.data();
  return userData.displayName || null;
};