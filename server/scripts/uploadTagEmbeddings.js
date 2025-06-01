const path = require('path');
const { bucket } = require('../config/firebase'); // ← שימוש ב־firebase.js הקיים

async function uploadTagEmbeddings() {
  const localPath = path.join(__dirname, 'openai_tag_embeddings.json');
  const destination = 'tag_embeddings_openai.json';
  
  try {
    await bucket.upload(localPath, {
      destination,
      metadata: {
        contentType: 'application/json',
        cacheControl: 'public, max-age=31536000' // שמירה בדפדפן (אופציונלי)
      }
    });
    console.log(`✅ הקובץ הועלה ל־Firebase Storage אל: ${destination}`);
  } catch (error) {
    console.error('❌ שגיאה בהעלאה ל־Firebase:', error.message);
  }
}

uploadTagEmbeddings();
