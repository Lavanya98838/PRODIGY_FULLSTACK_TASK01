import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Step 1 - Send OTP to email
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      return setError("Please enter your email");
    }

    if (!isValidEmail(email)) {
      return setError("Please enter a valid email address");
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );
      setSuccess(response.data.message);
      setStep(2);
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 2 - Verify OTP and reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp || !newPassword) {
      return setError("Please fill all fields");
    }

    if (newPassword.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { email, otp, newPassword }
      );
      setSuccess(response.data.message);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {/* Step 1 - Enter email to get OTP */}
      {step === 1 && (
        <form onSubmit={handleSendOTP}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      )}

      {/* Step 2 - Enter OTP and new password */}
      {step === 2 && (
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="Enter 6 digit OTP from email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Minimum 6 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>

          <div className="link">
            <a onClick={() => setStep(1)}>Resend OTP</a>
          </div>
        </form>
      )}

      <div className="link">
        <a onClick={() => navigate("/login")}>Back to Login</a>
      </div>
    </div>
  );
};

export default ForgotPassword;