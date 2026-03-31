import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const pageStyle = {
    minHeight: "100vh",
    background: "#f0f2f5",
    fontFamily: "Arial, sans-serif",
    padding: "40px 20px"
  };

  const cardStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    overflow: "hidden"
  };

  const headerStyle = {
    background: "linear-gradient(135deg, #1a237e 0%, #1565c0 100%)",
    padding: "32px 40px",
    color: "white"
  };

  const bodyStyle = {
    padding: "32px 40px"
  };

  const fieldStyle = {
    display: "flex",
    alignItems: "flex-start",
    padding: "16px 0",
    borderBottom: "1px solid #f0f0f0"
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: "600",
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    minWidth: "130px"
  };

  const valueStyle = {
    fontSize: "15px",
    color: "#333",
    fontWeight: "500",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    flex: 1,
    lineHeight: "1.5"
  };

  const badgeStyle = {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    backgroundColor: user && user.role === "admin" ? "#e8eaf6" : "#e8f5e9",
    color: user && user.role === "admin" ? "#1a237e" : "#2e7d32"
  };

  const logoutBtnStyle = {
    padding: "12px 28px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "24px"
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>

        {/* Header */}
        <div style={headerStyle}>
          <div style={{
            width: "64px",
            height: "64px",
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
            fontSize: "28px",
            fontWeight: "bold"
          }}>
            {user && user.name.charAt(0).toUpperCase()}
          </div>
          <h1 style={{ margin: "0 0 4px", fontSize: "22px", fontWeight: "700" }}>
            {user && user.name}
          </h1>
          <p style={{ margin: 0, opacity: 0.8, fontSize: "14px" }}>
            {user && user.email}
          </p>
        </div>

        {/* Body */}
        <div style={bodyStyle}>
          <h2 style={{ margin: "0 0 20px", fontSize: "18px", color: "#1a237e", fontWeight: "700" }}>
            Account Details
          </h2>

          <div style={fieldStyle}>
            <span style={labelStyle}>Full Name</span>
            <span style={valueStyle}>{user && user.name}</span>
          </div>

          <div style={fieldStyle}>
            <span style={labelStyle}>Employee ID</span>
            <span style={valueStyle}>{user && user.employeeId}</span>
          </div>

          <div style={fieldStyle}>
            <span style={labelStyle}>Email</span>
            <span style={valueStyle}>{user && user.email}</span>
          </div>

          <div style={{ ...fieldStyle, borderBottom: "none" }}>
            <span style={labelStyle}>Role</span>
            <span style={badgeStyle}>
              {user && user.role === "admin" ? "Administrator" : "User"}
            </span>
          </div>

          <button style={logoutBtnStyle} onClick={handleLogout}>
            Sign Out
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
