const { JWT_SECRET } = require('../middleware/auth');

// Simple login controller
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Simple authentication (in production, use proper password hashing)
    if (username === 'admin' && password === 'admin123') {
      // Return a simple token for now
      res.json({
        message: 'Login successful',
        token: 'admin_token',
        user: { username: 'admin', id: 1 }
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Verify token endpoint
exports.verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.substring(7);
    
    if (token === 'admin_token') {
      res.json({ valid: true, user: { username: 'admin', id: 1 } });
    } else {
      res.status(401).json({ valid: false, message: 'Invalid token' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
