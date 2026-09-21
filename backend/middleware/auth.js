const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "kiwigram-secret",
    );
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const adminMiddleware = (req, res, next) => {
  // Check if user is admin - implement based on your auth logic
  next();
};

// Decodes token if present, but doesn't block if absent
const optionalAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "kiwigram-secret");
      req.userId = decoded.userId;
    }
  } catch (_) {
    // ignore invalid tokens
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware, optionalAuth };
