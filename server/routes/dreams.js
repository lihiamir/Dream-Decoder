const express = require('express');
const router= express.Router();
const dreamsController = require('../controllers/dreams.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { authenticateToken } = require('../middlewares/auth');

router.post('/submit', authenticateToken, upload.single('audio'), dreamsController.submitDream);
router.post('/clarify', authenticateToken, upload.array('audio'), dreamsController.clarifyDream);

router.get('/my-dreams', authenticateToken, dreamsController.getAllDreams); 

module.exports = router;