const chatService = require('./chat');

async function extractSymbolInterpretations(scenes, background, interpretationStyle) {
  const results = [];

  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];

    // שולח ל־GPT לקבלת סמלים חדשים עם פרשנות אחת, לפי סצנה, רקע, וסגנון פרשנות
    const symbols = await chatService.findSymbolsFromGPT(scene, background, interpretationStyle);

    const interpretations = symbols.map(sym => ({
      symbol: sym.symbol,
      meaning: sym.meaning 
    }));

    results.push({
      scene,
      symbols: interpretations
    });
  }

  return results;
}

module.exports = {
  extractSymbolInterpretations
};