import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Validate email format on frontend
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Frontend validations
    if (!name || !employeeId || !email || !password) {
      return setError("Please fill all fields");
    }

    if (!isValidEmail(email)) {
      return setError("Please enter a valid email address");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, employeeId, email, password }
      );
      setSuccess(response.data.message);
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
      {success && <p className="success">{success}</p>}

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
            placeholder="Minimum 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>

      <div className="link">
        Already have an account?{" "}
        <a onClick={() => navigate("/login")}>Login here</a>
      </div>
    </div>
  );
};

export default Register;