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

  return (
    <>
      {/* Main Navbar */}
      <nav style={{
        backgroundColor: "#333",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        position: "relative",
      }}>

        {/* App name - centered */}
        <h3
          style={{ cursor: "pointer", margin: 0, textAlign: "center" }}
          onClick={() => navigate(user ? "/dashboard" : "/login")}
        >
          MyAuthApp
        </h3>

        {/* Right side buttons - only shown when logged in */}
        {user && (
          <div style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            position: "absolute",
            right: "20px"
          }}>

            {/* Dashboard button - hidden when already on dashboard */}
            {location.pathname !== "/dashboard" && (
              <button
                onClick={() => navigate("/dashboard")}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}>
                Dashboard
              </button>
            )}

            {/* Admin Panel button - only for admin users */}
            {user.role === "admin" && (
              <button
                onClick={() => navigate("/admin")}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#ff9800",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}>
                Admin Panel
              </button>
            )}

            <button
              onClick={handleLogout}
              style={{
                padding: "5px 10px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}>
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Greeting Navbar - only shown when logged in */}
      {user && (
        <div style={{
          backgroundColor: "#2d20d8ca",
          padding: "8px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}>
          <p style={{
            margin: 0,
            fontSize: "15px",
            textAlign: "center",
            wordBreak: "break-word",
            maxWidth: "90%",
            lineHeight: "1.5"
          }}>
            Welcome back, <strong>{user.name}</strong>! .
          </p>
        </div>
      )}
    </>
  );
};

export default Navbar;