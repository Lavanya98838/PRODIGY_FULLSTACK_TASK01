// Import required packages
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// This middleware protects routes from unauthenticated users
const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in request headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Get token from header - format is "Bearer tokenvalue"
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using our JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database using id from token
      // .select("-password") means don't return the password
      req.user = await User.findById(decoded.id).select("-password");

      // Move to the next middleware or route handler
      next();
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Middleware to check if user is an admin
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // user is admin so continue
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};

// Export both middlewares
module.exports = { protect, adminOnly };