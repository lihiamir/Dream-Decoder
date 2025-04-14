const admin = require('../config/firebase');

exports.createUser = async (email, password, username) => {
  // Check if user with this email already exists
  try {
    await admin.auth().getUserByEmail(email);
    throw new Error('User with this email already exists');
  } catch (error) {
    if (error.code !== 'auth/user-not-found') {
      throw error; // If it's any other error, rethrow it
    }
  }

  // If no user found, create new user
  return await admin.auth().createUser({
    email: email,
    password: password,
    displayName: username
  });
};

exports.verifyToken = async (idToken) => {
  return await admin.auth().verifyIdToken(idToken);
};
