import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Validate email format on frontend
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Frontend validations
    if (!email || !password) {
      return setError("Please fill all fields");
    }

    if (!isValidEmail(email)) {
      return setError("Please enter a valid email address");
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
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
      <h2>Welcome Back</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="link">
        <a onClick={() => navigate("/forgot-password")}>Forgot Password?</a>
      </div>

      <div className="link">
        Don't have an account?{" "}
        <a onClick={() => navigate("/register")}>Register here</a>
      </div>
    </div>
  );
};

export default Login;