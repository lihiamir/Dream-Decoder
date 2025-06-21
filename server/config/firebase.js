  const admin = require('firebase-admin');
  // Load service account key from Firebase (downloaded from Firebase Console)
  const serviceAccount = require('../firebaseServiceKey.json'); 

  // Initialize Firebase Admin SDK
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'dream-decoder-1fcb8.firebasestorage.app' 
  });

  // Get a reference to the default storage bucket
  const bucket = admin.storage().bucket();

  module.exports = { admin, bucket };
  