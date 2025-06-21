const chatService = require('./chat');

// For each scene, get symbolic elements from GPT based on background and interpretation style
exports.extractSymbolInterpretations = async(scenes, background, interpretationStyle)  => {
  const results = [];

  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];

    // Ask GPT for up to 5 symbols for this scene
    const symbols = await chatService.findSymbolsFromGPT(scene, background, interpretationStyle);

    // Map response into { symbol, meaning } format
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