import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext(null);

const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      const loginTime = localStorage.getItem("loginTime");

      if (!saved || !loginTime) return null;

      // Check if 30 minutes have passed since login
      const elapsed = Date.now() - parseInt(loginTime);
      if (elapsed > SESSION_DURATION) {
        // Session expired — clear everything
        localStorage.removeItem("user");
        localStorage.removeItem("loginTime");
        return null;
      }

      return JSON.parse(saved);
    } catch {
      return null;
    }
  });

  // Check session expiry every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const loginTime = localStorage.getItem("loginTime");
      if (loginTime) {
        const elapsed = Date.now() - parseInt(loginTime);
        if (elapsed > SESSION_DURATION) {
          // Session expired — force logout
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("loginTime");
        }
      }
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("loginTime", Date.now().toString());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("loginTime");
  };

  const forceLogout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, forceLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};