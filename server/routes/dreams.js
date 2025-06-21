    const express = require('express');
    const router= express.Router();
    const dreamsController = require('../controllers/dreams.js');
    const multer = require('multer');

    // Configure multer to store uploaded audio files in 'uploads/' folder
    const upload = multer({ dest: 'uploads/' });
    const { authenticateToken } = require('../middlewares/auth');

    // Submit a new dream (supports optional audio input)
    router.post('/submit', authenticateToken, upload.single('audio'), dreamsController.submitDream);
    
    // Submit follow-up clarifications (supports multiple audio/text answers)
    router.post('/clarify', authenticateToken, upload.array('audio'), dreamsController.clarifyDream);
    
    // Get all dreams for the authenticated user
    router.get('/my-dreams', authenticateToken, dreamsController.getAllDreams); 
    
    // Get a specific dream by ID
    router.get('/my-dreams/:dreamId', authenticateToken, dreamsController.getDreamById);
    
    // Get dream recommendations based on a specific dream
    router.get("/recommendations/:dreamId", authenticateToken, dreamsController.getRecommendedDreams);

    module.exports = router;