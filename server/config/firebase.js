  const admin = require('firebase-admin');
  const serviceAccount = require('../firebaseServiceKey.json'); // downloaded from Firebase

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'dream-decoder-1fcb8.appspot.com' 
  });
  const bucket = admin.storage().bucket();

  module.exports = { admin, bucket };
  