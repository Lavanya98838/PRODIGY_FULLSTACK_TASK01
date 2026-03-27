const nodemailer = require("nodemailer");

const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"MyAuthApp" <${process.env.EMAIL_USER}>`,
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
  console.log(`OTP email sent successfully to ${email}`);
};

module.exports = { sendOTPEmail };