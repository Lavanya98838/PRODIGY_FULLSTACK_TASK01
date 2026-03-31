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
  const { login } = useAuth();
  const navigate = useNavigate();

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getPasswordErrors = (pwd) => {
    const errors = [];
    if (pwd.length < 8) errors.push("at least 8 characters");
    if (!/[A-Z]/.test(pwd)) errors.push("one uppercase letter");
    if (!/[a-z]/.test(pwd)) errors.push("one lowercase letter");
    if (!/[0-9]/.test(pwd)) errors.push("one number");
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd))
      errors.push("one special character");
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
      setError(
        err.response ? err.response.data.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Create Account</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Employee ID</label>
          <input
            type="text"
            placeholder="Enter your employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Min 8 chars with uppercase, lowercase, number, special"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {strength && (
            <div style={{ marginTop: "8px" }}>
              <div style={{
                height: "6px",
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
                fontWeight: "bold"
              }}>
                {strength.label} password
              </p>
            </div>
          )}

          <div style={{
            fontSize: "11px",
            color: "#888",
            marginTop: "6px",
            lineHeight: "1.6"
          }}>
            Must contain: uppercase, lowercase, number, special character (!@#$%^&*)
          </div>
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPassword.length > 0 && (
            <p style={{
              fontSize: "12px",
              color: password === confirmPassword ? "#4CAF50" : "#f44336",
              margin: "4px 0 0",
              fontWeight: "bold"
            }}>
              {password === confirmPassword
                ? "Passwords match!"
                : "Passwords do not match"}
            </p>
          )}
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>

      <div className="link">
        Already have an account?{" "}
        <a onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
          Login here
        </a>
      </div>
    </div>
  );
};

export default Register;