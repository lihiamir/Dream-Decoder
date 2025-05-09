const express = require('express');
const router= express.Router();
const dreamsController = require('../controllers/dreams.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { authenticateToken } = require('../middlewares/auth');

// router.post('/text', authenticateToken, dreamsController.text);
// router.post('/voice', authenticateToken, upload.single('audio'), dreamsController.voice); 
router.post('/submit', authenticateToken, upload.single('audio'), dreamsController.submitDream);


module.exports = router;