const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // User's name field
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Employee ID field
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // User's email field
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    // User's password field
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // User's role field
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // Whether email is verified or not
    isVerified: {
      type: Boolean,
      default: false,
    },

    // Email verification token
    verifyToken: {
      type: String,
      default: null,
    },

    // OTP code for forgot password
    otpCode: {
      type: String,
      default: null,
    },

    // OTP expiry time
    otpExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);