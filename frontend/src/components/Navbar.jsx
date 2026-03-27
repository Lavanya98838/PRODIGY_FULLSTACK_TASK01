import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  // If context is not available yet return empty navbar
  if (!context) return <nav style={{ backgroundColor: "#333", padding: "10px 20px" }}></nav>;

  const { user, logout } = context;

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
      <h3 style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
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