const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middlewares/auth');
const profileController = require('../controllers/profile');

router.post('/setup', authenticateToken, profileController.saveInterpretationProfile);

module.exports = router;