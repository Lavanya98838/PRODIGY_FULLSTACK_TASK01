
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

      <div style={{
        width: "100%",
        borderTop: "1px solid #eee",
        paddingTop: "15px",
        marginTop: "10px"
      }}>

        <div style={{
          display: "flex",
          marginBottom: "10px",
          alignItems: "flex-start"
        }}>
          <span style={{
            fontWeight: "bold",
            minWidth: "120px",
            fontSize: "16px"
          }}>
            Name:
          </span>
          <span style={{
            fontSize: "16px",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            flex: 1,
            lineHeight: "1.5"
          }}>
            {user && user.name}
          </span>
        </div>

        <div style={{
          display: "flex",
          marginBottom: "10px",
          alignItems: "flex-start"
        }}>
          <span style={{
            fontWeight: "bold",
            minWidth: "120px",
            fontSize: "16px"
          }}>
            Employee ID:
          </span>
          <span style={{
            fontSize: "16px",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            flex: 1
          }}>
            {user && user.employeeId}
          </span>
        </div>

        <div style={{
          display: "flex",
          marginBottom: "10px",
          alignItems: "flex-start"
        }}>
          <span style={{
            fontWeight: "bold",
            minWidth: "120px",
            fontSize: "16px"
          }}>
            Email:
          </span>
          <span style={{
            fontSize: "16px",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            flex: 1
          }}>
            {user && user.email}
          </span>
        </div>

        <div style={{
          display: "flex",
          marginBottom: "10px",
          alignItems: "flex-start"
        }}>
          <span style={{
            fontWeight: "bold",
            minWidth: "120px",
            fontSize: "16px"
          }}>
            Role:
          </span>
          <span style={{
            fontSize: "16px",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            flex: 1
          }}>
            {user && user.role}
          </span>
        </div>

      </div>

      <button className="btn-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;