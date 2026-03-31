import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Admin = () => {
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
    background: "linear-gradient(135deg, #1a237e 0%, #283593 100%)",
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

  const statCardStyle = {
    background: "#f8f9ff",
    border: "1px solid #e8eaf6",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    flex: 1
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>

        {/* Header */}
        <div style={headerStyle}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "rgba(255,255,255,0.15)",
            padding: "6px 14px",
            borderRadius: "20px",
            marginBottom: "16px"
          }}>
            <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "1px" }}>
              ADMINISTRATOR
            </span>
          </div>
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

          {/* Stats Row */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "28px" }}>
            <div style={statCardStyle}>
              <p style={{ margin: "0 0 4px", fontSize: "24px", fontWeight: "700", color: "#1a237e" }}>
                Full
              </p>
              <p style={{ margin: 0, fontSize: "12px", color: "#999", fontWeight: "600" }}>
                ACCESS LEVEL
              </p>
            </div>
            <div style={statCardStyle}>
              <p style={{ margin: "0 0 4px", fontSize: "24px", fontWeight: "700", color: "#1a237e" }}>
                Admin
              </p>
              <p style={{ margin: 0, fontSize: "12px", color: "#999", fontWeight: "600" }}>
                ROLE
              </p>
            </div>
          </div>

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
            <span style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "600",
              backgroundColor: "#e8eaf6",
              color: "#1a237e"
            }}>
              Administrator
            </span>
          </div>

          {/* Admin Controls */}
          <div style={{
            backgroundColor: "#f8f9ff",
            border: "1px solid #e8eaf6",
            borderRadius: "12px",
            padding: "20px",
            marginTop: "24px"
          }}>
            <h3 style={{ margin: "0 0 8px", fontSize: "16px", color: "#1a237e", fontWeight: "700" }}>
              Admin Controls
            </h3>
            <p style={{ margin: 0, fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
              You have full administrative access to all features and settings of the application.
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: "12px 28px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "24px"
            }}
          >
            Sign Out
          </button>

        </div>
      </div>
    </div>
  );
};

export default Admin;
