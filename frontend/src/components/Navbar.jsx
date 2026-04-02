import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navStyle = {
    backgroundColor: "#1a237e",
    padding: "0 32px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    position: "relative",
    height: "60px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    fontFamily: "Arial, sans-serif"
  };

  const btnStyle = {
    padding: "7px 16px",
    border: "none",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer"
  };

  const greetingStyle = {
    backgroundColor: "#e8eaf6",
    padding: "10px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif"
  };

  return (
    <>
      {/* Main Navbar */}
      <nav style={navStyle}>

        {/* App Name - Centered */}
        <h3
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: "700",
            cursor: "pointer",
            letterSpacing: "0.5px"
          }}
          onClick={() => navigate(user ? "/dashboard" : "/login")}
        >
          MyAuthApp
        </h3>

        {/* Right side buttons */}
        {user && (
          <div style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            position: "absolute",
            right: "32px"
          }}>
            {location.pathname !== "/dashboard" && (
              <button
                onClick={() => navigate("/dashboard")}
                style={{
                  ...btnStyle,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "white"
                }}
              >
                Dashboard
              </button>
            )}

            {user.role === "admin" && location.pathname !== "/admin" && (
              <button
                onClick={() => navigate("/admin")}
                style={{
                  ...btnStyle,
                  backgroundColor: "#ff9800",
                  color: "white"
                }}
              >
                 Admin Panel
              </button>
            )}

            <button
              onClick={handleLogout}
              style={{
                ...btnStyle,
                backgroundColor: "#f44336",
                color: "white"
              }}
            >
              Sign Out
            </button>
          </div>
        )}
      </nav>

      {/* Greeting Bar */}
      {user && (
        <div style={greetingStyle}>
          <p style={{
            margin: 0,
            fontSize: "14px",
            color: "#1a237e",
            fontWeight: "600",
            textAlign: "center",
            wordBreak: "break-word",
            maxWidth: "90%",
            lineHeight: "1.5"
          }}>
            Welcome back, {user.name}! You are logged in as{" "}
            <span style={{
              backgroundColor: "#1a237e",
              color: "white",
              padding: "2px 10px",
              borderRadius: "12px",
              fontSize: "12px"
            }}>
              {user.role === "admin" ? "Administrator" : "User"}
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default Navbar;
