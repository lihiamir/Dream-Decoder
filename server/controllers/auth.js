const authService = require('../services/auth.js');

// Handle user registration using a Bearer token
exports.register = async (req, res) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    // If no token was provided, return 401 Unauthorized
    if (!token) return res.status(401).json({ error: 'Token missing' });
  
    try {
      // Verify token and register the user
      const userInfo = await authService.registerUser(token);
      
      // Return success response with user info
      res.status(201).json({ message: 'User registered seccessfuly', user:userInfo});
    } catch (error) {
      // Handle invalid or expired token
      res.status(401).json({ error: 'Invalid token' });
    }
  };
  
  // Handle user login using a Bearer token
exports.login = async (req, res) => {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split('Bearer ')[1];

    // If no token was provided, return 401 Unauthorized
    if (!token) return res.status(401).json({ error: 'Token missing' });

    try {
      // Verify token and return user info
      const userInfo = await authService.loginUser(token);

      // Return success response
      res.status(200).json({ message: 'Login successful', user: userInfo });
    } catch (error) {
      // Token is invalid or expired
      console.error('Login error:', error);
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
  
// Get displayName of the current user
exports.getUserDisplayName = async (req, res) => {
  const uid = req.uid;

  try {
    // Retrieve displayName from Firestore
    const displayName = await authService.getUserDisplayName(uid);

    // If not found, return 404
    if (!displayName) {
      return res.status(404).json({ error: "User not found or displayName missing" });
    }

    // Return displayName 
    res.status(200).json({ displayName });
  } catch (error) {
    // Internal server error
    console.error("Error getting user display name:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
