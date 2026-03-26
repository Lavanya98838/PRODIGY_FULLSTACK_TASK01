const nodemailer = require("nodemailer");

// Create transporter using Gmail with timeout settings
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
    tls: {
      rejectUnauthorized: false,
    },
  });
};

// Function to send verification email
const sendVerificationEmail = async (email, token) => {
  const transporter = createTransporter();
  const encodedToken = encodeURIComponent(token);
  const verifyURL = `https://prodigy-fullstack-task01.onrender.com/api/auth/verify-email/${encodedToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email Address",
    html: `
      <h2>Email Verification</h2>
      <p>Thank you for registering! Please verify your email by clicking the link below:</p>
      <a href="${verifyURL}" style="
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        display: inline-block;
        margin: 20px 0;
      ">Verify Email</a>
      <p>Or copy and paste this link in your browser:</p>
      <p>${verifyURL}</p>
      <p>This link expires in 24 hours.</p>
      <p>If you did not register please ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Function to send OTP email
const sendOTPEmail = async (email, otp) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <h2>Password Reset OTP</h2>
      <p>You requested a password reset. Use the OTP below:</p>
      <h1 style="
        background-color: #f0f2f5;
        padding: 20px;
        text-align: center;
        letter-spacing: 10px;
        font-size: 40px;
        color: #333;
      ">${otp}</h1>
      <p>This OTP expires in <strong>10 minutes</strong>.</p>
      <p>If you did not request this please ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail, sendOTPEmail };