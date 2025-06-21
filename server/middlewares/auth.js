const { admin }= require('../config/firebase');

// Middleware to authenticate Firebase ID token from Authorization header
exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' });
  }

  // Extract the token from the header
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using Firebase Admin SDK
    const decoded = await admin.auth().verifyIdToken(token);

    // Attach user info to the request for downstream use
    req.uid = decoded.uid;
    req.user = decoded;
    // Continue to the next middleware or route
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};