import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getPasswordErrors = (pwd) => {
    const errors = [];
    if (pwd.length < 8) errors.push("at least 8 characters");
    if (!/[A-Z]/.test(pwd)) errors.push("one uppercase letter");
    if (!/[a-z]/.test(pwd)) errors.push("one lowercase letter");
    if (!/[0-9]/.test(pwd)) errors.push("one number");
    if (!/[!@#$%^&*()_+={}|,.]/.test(pwd)) errors.push("one special character");
    return errors;
  };

  const getStrengthLevel = (pwd) => {
    if (pwd.length === 0) return null;
    const errors = getPasswordErrors(pwd);
    if (errors.length >= 4) return { label: "Weak", color: "#f44336", width: "25%" };
    if (errors.length === 3) return { label: "Fair", color: "#ff9800", width: "50%" };
    if (errors.length === 1 || errors.length === 2) return { label: "Good", color: "#2196F3", width: "75%" };
    return { label: "Strong", color: "#4CAF50", width: "100%" };
  };

  const strength = getStrengthLevel(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !employeeId || !email || !password || !confirmPassword) {
      return setError("Please fill all fields");
    }
    if (!isValidEmail(email)) {
      return setError("Please enter a valid email address");
    }
    const passwordErrors = getPasswordErrors(password);
    if (passwordErrors.length > 0) {
      return setError("Password must contain " + passwordErrors.join(", "));
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        { name, employeeId, email, password }
      );
      login(response.data);
      navigate("/dashboard");
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
    padding: "40px",
    width: "100%",
    maxWidth: "480px",
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
    letterSpacing: "0.5px",
    marginTop: "8px"
  };

  const linkStyle = {
    color: "#1a237e",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none"
  };

  const rowStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "20px"
  };

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
            Create Account
          </h1>
          <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>
            Fill in the details below to get started
          </p>
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

        <form onSubmit={handleSubmit}>

          {/* Name and Employee ID - side by side */}
          <div style={rowStyle}>
            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Employee ID</label>
              <input
                type="text"
                placeholder="Your employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min 8 chars with uppercase, number, special"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            {/* Strength bar */}
            {strength && (
              <div style={{ marginTop: "8px" }}>
                <div style={{
                  height: "5px",
                  backgroundColor: "#eee",
                  borderRadius: "3px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    height: "100%",
                    width: strength.width,
                    backgroundColor: strength.color,
                    borderRadius: "3px",
                    transition: "width 0.3s ease"
                  }} />
                </div>
                <p style={{
                  fontSize: "12px",
                  color: strength.color,
                  margin: "4px 0 0",
                  fontWeight: "600"
                }}>
                  {strength.label} password
                </p>
              </div>
            )}

            <p style={{ fontSize: "11px", color: "#999", margin: "6px 0 0", lineHeight: "1.5" }}>
              Must include uppercase, lowercase, number and special character (!@#$%^)
            </p>
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Confirm Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ ...inputStyle, paddingRight: "60px" }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {confirmPassword.length > 0 && (
              <p style={{
                fontSize: "12px",
                color: password === confirmPassword ? "#4CAF50" : "#f44336",
                margin: "4px 0 0",
                fontWeight: "600"
              }}>
                {password === confirmPassword ? "Passwords match!" : "Passwords do not match"}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#666" }}>
          {"Already have an account? "}
          <a onClick={() => navigate("/login")} style={linkStyle}>
            Sign In
          </a>
        </p>

      </div>
    </div>
  );
};

export default Register;
