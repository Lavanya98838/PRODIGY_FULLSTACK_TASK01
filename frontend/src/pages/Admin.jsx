import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <h2>Admin Panel</h2>
      <p>Welcome Admin: {user && user.name}</p>
      <p>Email: {user && user.email}</p>
      <p>Role: {user && user.role}</p>
      <div style={{ marginTop: "20px" }}>
        <h3>Admin Controls</h3>
        <p>You have full access to all features!</p>
      </div>
      <button className="btn-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Admin;