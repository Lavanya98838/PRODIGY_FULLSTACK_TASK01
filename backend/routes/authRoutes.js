const express = require("express");
const router = express.Router();

const {
  registerUser,
  verifyEmail,
  loginUser,
  forgotPassword,
  resetPassword,
  getProfile,
} = require("../controllers/authController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", registerUser);
router.get("/verify-email/:token", verifyEmail);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected routes
router.get("/profile", protect, getProfile);

// Admin only route
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

module.exports = router;