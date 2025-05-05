const dreamsService = require('../services/dreams');

exports.voice = async (req, res) => {
    const {text} = req.body;
    if (!text) return res.status(400).json({ error: 'Missing text' });
    try {
        const result = await dreamsService.processTextDream(text);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

exports.text = async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'Missing audio file' });
  
    try {
      const result = await dreamsService.processVoiceDream(file.path);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

