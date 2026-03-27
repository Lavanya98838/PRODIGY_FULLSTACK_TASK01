const https = require("https");

const sendOTPEmail = async (email, otp) => {
  const data = JSON.stringify({
    sender: {
      name: "MyAuthApp",
      email: process.env.EMAIL_USER,
    },
    to: [{ email: email }],
    subject: "Password Reset OTP",
    htmlContent: `
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
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.brevo.com",
      path: "/v3/smtp/email",
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
        "content-length": Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`OTP email sent successfully to ${email}`);
          resolve(responseData);
        } else {
          console.error("Brevo API error:", responseData);
          reject(new Error(`Brevo API error: ${responseData}`));
        }
      });
    });

    req.on("error", (error) => {
      console.error("Request error:", error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
};

module.exports = { sendOTPEmail };