const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { authenticateToken } = require('../middlewares/auth');

// Register a new user (requires Firebase token)
router.post('/register', authController.register);

// Login an existing user (requires Firebase token)
router.post('/login', authController.login);

// Get user's display name (requires authentication)
router.get('/user', authenticateToken, authController.getUserDisplayName);

module.exports = router;
