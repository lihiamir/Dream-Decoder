const profileService = require('../services/profile');

// Handles saving the user's interpretation profile (background and style)
exports.saveInterpretationProfile = async (req, res) => {
  try {
    const uid = req.uid; 
    const data = req.body; // Get profile data from the request body

    // Save or update the user's interpretation profile in Firestore
    await profileService.saveInterpretationProfile(uid, data);

    res.status(200).json({ message: 'Profile saved successfully' });
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ error: 'Failed to save profile' });
  }
};
