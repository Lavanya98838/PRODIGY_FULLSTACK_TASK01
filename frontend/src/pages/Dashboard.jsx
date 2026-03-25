// Import required hooks
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Get user data and logout function from auth context
  const { user, logout } = useAuth();

  // For navigating to other pages
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <h2>Welcome to Dashboard!</h2>

      <p>Name: {user && user.name}</p>
      <p>Email: {user && user.email}</p>
      <p>Role: {user && user.role}</p>

      <button className="btn-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;