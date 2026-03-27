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
      justifyContent: "space-between",
      alignItems: "center",
      color: "white"
    }}>
      <h3
        style={{ cursor: "pointer", margin: 0 }}
        onClick={() => navigate(user ? "/dashboard" : "/login")}
      >
        MyAuthApp
      </h3>

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {user ? (
          <>
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
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "5px 10px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}>
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              style={{
                padding: "5px 10px",
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}>
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;