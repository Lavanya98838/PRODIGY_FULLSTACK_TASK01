const nodemailer = require("nodemailer");

const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
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

// Only OTP email remains
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

module.exports = { sendOTPEmail };