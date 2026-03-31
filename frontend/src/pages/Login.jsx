import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) return setError("Please fill all fields");
    if (!isValidEmail(email)) return setError("Please enter a valid email address");

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
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
    padding: "48px 40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
  };

  const logoBoxStyle = {
    width: "60px",
    height: "60px",
    backgroundColor: "#1a237e",
    borderRadius: "12px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px"
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

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={logoBoxStyle}>
            <span style={{ color: "white", fontSize: "28px", fontWeight: "bold" }}>M</span>
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#1a237e", margin: "0 0 6px" }}>
            Welcome
          </h1>
          <p style={{ color: "#666", fontSize: "14px", margin: 0 }}>
            Sign in to your account to continue
          </p>
        </div>

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

          <div style={{ marginBottom: "12px" }}>
            <label style={labelStyle}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
          </div>

          <div style={{ textAlign: "right", marginBottom: "24px" }}>
            <a onClick={() => navigate("/forgot-password")} style={linkStyle}>
              Forgot Password?
            </a>
          </div>

          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#666" }}>
          {"Don't have an account? "}
          <a onClick={() => navigate("/register")} style={linkStyle}>
            Create Account
          </a>
        </p>

      </div>
    </div>
  );
};

export default Login;
