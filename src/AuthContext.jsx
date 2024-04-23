import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const storedToken = localStorage.getItem("token") || "";

  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);


  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;