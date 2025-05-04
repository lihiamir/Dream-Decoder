const admin = require('../config/firebase');

exports.registerUser = async (token) => {
    const decoded = await verifyToken(token);
    const uid = decoded.uid;
    const email = decoded.email;
    const displayName = decoded.name || null;
    const userData = {
      uid,
      email,
      displayName,
      createdAt: new Date()
    };
    await saveUserToFirestore(userData);
    return userData;
};

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
