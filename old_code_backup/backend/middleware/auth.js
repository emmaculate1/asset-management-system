const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'asset_management_secret_key';

// Simple authentication middleware
const authenticateAdmin = (req, res, next) => {
  // For now, we'll use a simple session-based approach
  // In production, you'd want to use JWT tokens
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. Admin authentication required.' });
  }
  
  const token = authHeader.substring(7);
  
  try {
    // Simple token verification (in production, use proper JWT)
    if (token === 'admin_token') {
      req.admin = { username: 'admin', id: 1 };
      next();
    } else {
      res.status(401).json({ message: 'Invalid admin token.' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = { authenticateAdmin, JWT_SECRET };
