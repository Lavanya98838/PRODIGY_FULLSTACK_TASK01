// Import required hooks from React
import { createContext, useState, useContext } from "react";

// Create the context
const AuthContext = createContext();

// AuthProvider wraps our entire app and provides auth state
export const AuthProvider = ({ children }) => {
  // Check if user is already logged in from localStorage
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  // Login function - saves user data to state and localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function - clears user data from state and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context easily in any component
export const useAuth = () => {
  return useContext(AuthContext);
};