import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <h2>Welcome to Dashboard!</h2>
      <p>Name: {user && user.name}</p>
      <p>Employee ID: {user && user.employeeId}</p>
      <p>Email: {user && user.email}</p>
      <p>Role: {user && user.role}</p>
      <button className="btn-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;