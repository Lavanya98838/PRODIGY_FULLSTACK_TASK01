const Brevo = require("@getbrevo/brevo");

const sendOTPEmail = async (email, otp) => {
  const apiInstance = new Brevo.TransactionalEmailsApi();

  apiInstance.authentications["apiKey"].apiKey = process.env.BREVO_API_KEY;

  const sendSmtpEmail = new Brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "Password Reset OTP";
  sendSmtpEmail.to = [{ email: email }];
  sendSmtpEmail.sender = {
    name: "MyAuthApp",
    email: process.env.EMAIL_USER,
  };
  sendSmtpEmail.htmlContent = `
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
  `;

  await apiInstance.sendTransacEmail(sendSmtpEmail);
  console.log(`OTP email sent successfully to ${email}`);
};

module.exports = { sendOTPEmail };