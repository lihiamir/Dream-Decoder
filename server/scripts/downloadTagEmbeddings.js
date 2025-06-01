const path = require('path');
const fs = require('fs');
const { bucket } = require('../config/firebase'); // שימוש בקובץ firebase.js שלך

async function downloadTagEmbeddings() {
  const destinationFolder = path.join(__dirname, '../data');
  const destinationPath = path.join(destinationFolder, 'tag_embeddings_openai.json');

  // ודא שהתיקייה קיימת
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder);
  }

  if (fs.existsSync(destinationPath)) {
    console.log('📁 הקובץ כבר קיים, לא מתבצעת הורדה.');
    return;
  }

  try {
    await bucket.file('tag_embeddings_openai.json').download({ destination: destinationPath });
    console.log(`✅ הקובץ הורד ונשמר ב: ${destinationPath}`);
  } catch (error) {
    console.error('❌ שגיאה בהורדת הקובץ מה־Firebase Storage:', error.message);
  }
}

module.exports = downloadTagEmbeddings;
