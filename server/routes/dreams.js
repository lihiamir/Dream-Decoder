const express = require('express');
const router= express.Router();
const dreamsController = require('../controllers/dreams.js');

router.post('/text', dreamsController.text);
router.post('/voice',dreamsController.voice);

module.exports = router;
