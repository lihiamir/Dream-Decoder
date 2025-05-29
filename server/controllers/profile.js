const profileService = require('../services/profile');

exports.saveInterpretationProfile = async (req, res) => {
  try {
    const uid = req.uid; 
    const data = req.body;

    await profileService.saveInterpretationProfile(uid, data);

    res.status(200).json({ message: 'Profile saved successfully' });
  } catch (error) {
    console.error('❌ Error saving profile:', error);
    res.status(500).json({ error: 'Failed to save profile' });
  }
};
