const admin = require('../config/firebase');
const chatService = require('./chat');
const db = admin.firestore();
const { classifyMood, findMissingSymbolsFromGPT } = require('./gptService');

// Load all symbols into memory from Firestore
async function loadAllSymbols() {
  const snapshot = await db.collection('dreamSymbols').get();
  const symbols = {};

  snapshot.forEach(doc => {
    const data = doc.data();
    symbols[data.symbol.toLowerCase()] = {
      meanings: data.meanings
    };
  });

  return symbols;
}

// Save new symbol to Firestore if it doesn't already exist
async function saveSymbolToFirestore(symbolData) {
  const { symbol } = symbolData;
  const symbolId = symbol.toLowerCase();
  const docRef = db.collection('dreamSymbols').doc(symbolId);
  const existing = await docRef.get();

  if (!existing.exists) {
    await docRef.set(symbolData);
    console.log(`✅ Added new symbol: ${symbol}`);
  }
}

// Find symbols mentioned in the text
function findSymbolsInText(text, symbolMap) {
  const words = text.toLowerCase().split(/\W+/);
  const found = new Set();

  for (const word of words) {
    if (symbolMap[word]) {
      found.add(word);
    }
  }

  return [...found];
}

// Main function to process scenes and extract symbols + meanings
async function extractSymbolInterpretations(scenes, sceneMoods) {
    const symbolMap = await loadAllSymbols();
    const results = [];
  
    for (let i = 0; i < scenes.length; i++) {
      const scene = scenes[i];
      const mood = sceneMoods[i]; // ← משתמשים ברגש שהועבר מבחוץ
  
      const foundSymbols = findSymbolsInText(scene, symbolMap);
  
      const interpretations = foundSymbols.map(sym => ({
        symbol: sym,
        meaning: symbolMap[sym].meanings[mood] || symbolMap[sym].meanings["neutral"]
      }));
  
      const missingSymbols = await chatService.findMissingSymbolsFromGPT(scene, foundSymbols);
  
      for (const sym of missingSymbols) {
        const key = sym.symbol.toLowerCase();
        if (!symbolMap[key]) {
          await saveSymbolToFirestore(sym);
          interpretations.push({
            symbol: sym.symbol,
            meaning: sym.meanings[mood] || sym.meanings.neutral
          });
        }
      }
  
      results.push({
        scene,
        mood,
        symbols: interpretations
      });
    }
  
    return results;
  }

module.exports = {
  extractSymbolInterpretations
};
