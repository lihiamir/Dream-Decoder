const authService = require('../services/auth.js');

exports.register = async (req, res) => {
    const { email, password, username } = req.body;
  
    try {
      const userRecord = await authService.createUser(email, password, username);
      res.status(201).json({ message: 'User created successfully', uid: userRecord.uid });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.login = async (req, res) => {
    const { idToken } = req.body;
  
    try {
      const decodedToken = await authService.verifyToken(idToken);
      const uid = decodedToken.uid;
  
      res.status(200).json({
        message: 'Login successful',
        uid: uid,
        email: decodedToken.email,
        name: decodedToken.name || decodedToken.displayName
      });
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
  