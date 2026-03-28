import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{
      backgroundColor: "#333",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      position: "relative"
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
          <span>Hello, {user.name}!</span>

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
  );
};

export default Navbar;