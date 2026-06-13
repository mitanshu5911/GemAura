import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = (redirect = true) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);

    if (redirect) {
      navigate("/login", { replace: true });
    }
  };

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
    setIsAuthenticated(true);

    navigate("/", { replace: true });
  };

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (!savedToken || !savedUser) {
          setLoading(false);
          return;
        }

        const decoded = jwtDecode(savedToken);

        if (decoded.exp * 1000 < Date.now()) {
          logout(false);
          setLoading(false);
          return;
        }

        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);

        const remainingTime =
          decoded.exp * 1000 - Date.now();

        const logoutTimer = setTimeout(() => {
          logout();
        }, remainingTime);

        setLoading(false);

        return () => clearTimeout(logoutTimer);
      } catch (error) {
        console.error("Auth initialization failed:", error);

        logout(false);
        setLoading(false);
      }
    };

    const cleanup = initializeAuth();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
};
