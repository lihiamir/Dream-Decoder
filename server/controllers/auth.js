const authService = require('../services/auth.js');

exports.register = async (req, res) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) return res.status(401).json({ error: 'Token missing' });
  
    try {
      const userInfo = await authService.registerUser(token);
      
      res.status(201).json({ message: 'User registered seccessfuly', user:userInfo});
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
  
  exports.login = async (req, res) => {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) return res.status(401).json({ error: 'Token missing' });

    try {
      const userInfo = await authService.loginUser(token);
      res.status(200).json({ message: 'Login successful', user: userInfo });
    } catch (error) {
      console.error('Login error:', error);
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
  