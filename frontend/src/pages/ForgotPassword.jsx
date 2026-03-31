import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) return setError("Please enter your email");
    if (!isValidEmail(email)) return setError("Please enter a valid email address");

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        { email }
      );
      setSuccess(response.data.message);
      setStep(2);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp || !newPassword) return setError("Please fill all fields");
    if (newPassword.length < 8) return setError("Password must be at least 8 characters");

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        { email, otp, newPassword }
      );
      setSuccess(response.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const pageStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1a237e 0%, #283593 50%, #1565c0 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif"
  };

  const cardStyle = {
    background: "white",
    borderRadius: "16px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
  };

  const labelStyle = {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    color: "#333"
  };

  const btnStyle = {
    width: "100%",
    padding: "14px",
    backgroundColor: loading ? "#9fa8da" : "#1a237e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: loading ? "not-allowed" : "pointer",
    letterSpacing: "0.5px"
  };

  const linkStyle = {
    color: "#1a237e",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none"
  };

  const stepIndicatorStyle = (active) => ({
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: active ? "#1a237e" : "#e0e0e0",
    color: active ? "white" : "#999",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "600"
  });

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#1a237e",
            borderRadius: "12px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "14px"
          }}>
            <span style={{ color: "white", fontSize: "28px", fontWeight: "bold" }}>M</span>
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#1a237e", margin: "0 0 6px" }}>
            Reset Password
          </h1>
          <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>
            {step === 1 ? "Enter your email to receive an OTP" : "Enter the OTP sent to your email"}
          </p>
        </div>

        {/* Step Indicator */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "28px",
          gap: "8px"
        }}>
          <div style={stepIndicatorStyle(step >= 1)}>1</div>
          <div style={{
            height: "2px",
            width: "60px",
            backgroundColor: step === 2 ? "#1a237e" : "#e0e0e0"
          }} />
          <div style={stepIndicatorStyle(step === 2)}>2</div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            backgroundColor: "#ffebee",
            border: "1px solid #ef9a9a",
            borderRadius: "8px",
            padding: "12px 16px",
            marginBottom: "20px",
            color: "#c62828",
            fontSize: "14px"
          }}>
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div style={{
            backgroundColor: "#e8f5e9",
            border: "1px solid #a5d6a7",
            borderRadius: "8px",
            padding: "12px 16px",
            marginBottom: "20px",
            color: "#2e7d32",
            fontSize: "14px"
          }}>
            {success}
          </div>
        )}

        {/* Step 1 - Email */}
        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <div style={{ marginBottom: "24px" }}>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>
            <button type="submit" disabled={loading} style={btnStyle}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* Step 2 - OTP and New Password */}
        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Enter OTP</label>
              <input
                type="text"
                placeholder="Enter 6 digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                style={{ ...inputStyle, letterSpacing: "8px", fontSize: "18px", textAlign: "center" }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={labelStyle}>New Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{ ...inputStyle, paddingRight: "60px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#999",
                    fontSize: "13px",
                    padding: 0
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={btnStyle}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            <p style={{ textAlign: "center", marginTop: "16px", fontSize: "13px", color: "#666" }}>
              {"Didn't receive OTP? "}
              <a onClick={() => setStep(1)} style={linkStyle}>Resend</a>
            </p>
          </form>
        )}

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#666" }}>
          <a onClick={() => navigate("/login")} style={linkStyle}>
            Back to Sign In
          </a>
        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;
