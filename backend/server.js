// Load environment variables first
const dotenv = require("dotenv");
dotenv.config();

// Import required packages
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");

// Connect to MongoDB
connectDB();

// Create express app
const app = express();

// Security middleware — adds important HTTP headers
app.use(helmet());

// Rate limiting — max 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests
  message: {
    message: "Too many requests from this IP, please try again after 15 minutes"
  },
});

// Stricter rate limit for auth routes — max 10 requests per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 requests
  message: {
    message: "Too many login attempts, please try again after 15 minutes"
  },
});

// Apply rate limiting
app.use("/api", limiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);
app.use("/api/auth/forgot-password", authLimiter);

// CORS configuration — only allow our frontend to access backend
const corsOptions = {
  origin: [
    "http://localhost:5173",    // local development
    "https://your-app.vercel.app" // production frontend — update this later
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Basic test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Get port from .env
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});