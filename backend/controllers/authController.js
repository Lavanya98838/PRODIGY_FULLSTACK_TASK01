const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendVerificationEmail, sendOTPEmail } = require("../utils/sendEmail");

// ─── EMAIL VALIDATION ────────────────────────────────────
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ─── GENERATE TOKEN ──────────────────────────────────────
const generateToken = (id) => {
  return jwt.sign(
    { id: id },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

// ─── REGISTER ───────────────────────────────────────────
const registerUser = async (req, res) => {
  try {
    const name = req.body.name;
    const employeeId = req.body.employeeId;
    const email = req.body.email;
    const password = req.body.password;

    // Check if all fields are provided
    if (!name || !employeeId || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check if email already exists
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Check if employee ID already exists
    const empIdExists = await User.findOne({ employeeId: employeeId });
    if (empIdExists) {
      return res.status(400).json({ message: "Employee ID already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate email verification token
    const verifyToken = crypto.randomBytes(32).toString("hex");

    // Create new user
    const user = await User.create({
      name: name,
      employeeId: employeeId,
      email: email,
      password: hashedPassword,
      verifyToken: verifyToken,
      isVerified: false,
    });

    // Send response immediately without waiting for email
    res.status(201).json({
      message: "Registration successful! Please check your email to verify your account.",
    });

    // Send verification email AFTER response is sent
    // This way the response is not blocked by email sending
    sendVerificationEmail(email, verifyToken).catch((err) => {
      console.error("Email sending failed:", err.message);
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
res.status(201).json({
  message: "Registration successful! Please check your email to verify your account.",
});

// Send verification email AFTER response
sendVerificationEmail(email, verifyToken)
  .then(() => {
    console.log(`Verification email sent successfully to ${email}`);
  })
  .catch((err) => {
    console.error("Email sending failed:", err.message);
  });
// ─── VERIFY EMAIL ────────────────────────────────────────
const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;

    // Find user with this verification token
    const user = await User.findOne({ verifyToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification link" });
    }

    // Mark user as verified and clear token
    user.isVerified = true;
    user.verifyToken = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully! You can now login." });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── LOGIN ───────────────────────────────────────────────
const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    // Find user by email
    const user = await User.findOne({ email: email });

    // Check if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {

      // Check if email is verified
      if (!user.isVerified) {
        return res.status(401).json({ message: "Please verify your email before logging in" });
      }

      res.status(200).json({
        _id: user._id,
        name: user.name,
        employeeId: user.employeeId,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── FORGOT PASSWORD ─────────────────────────────────────
const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "No account found with this email" });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP and expiry time
    user.otpCode = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    // Send response immediately
    res.status(200).json({ message: "OTP sent to your email address" });

    // Send OTP email AFTER response
    sendOTPEmail(email, otp).catch((err) => {
      console.error("OTP email sending failed:", err.message);
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ─── VERIFY OTP AND RESET PASSWORD ───────────────────────
const resetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const otp = req.body.otp;
    const newPassword = req.body.newPassword;

    // Check if all fields are provided
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Check password length
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Find user by email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "No account found with this email" });
    }

    // Check if OTP matches and has not expired
    if (user.otpCode !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear OTP fields
    user.otpCode = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful! You can now login." });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── GET PROFILE ─────────────────────────────────────────
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        employeeId: user.employeeId,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  verifyEmail,
  loginUser,
  forgotPassword,
  resetPassword,
  getProfile,
};