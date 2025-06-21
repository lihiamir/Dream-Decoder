const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middlewares/auth');
const profileController = require('../controllers/profile');

// Save or update user's interpretation preferences (background, style)
router.post('/setup', authenticateToken, profileController.saveInterpretationProfile);

module.exports = router;