import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check token on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setUser({ email: localStorage.getItem("email") });
      // Optionally, fetch user details from backend using token
    }
  }, []);

  //login function
   const login = (email, token) => {
    // // if success:
    
    localStorage.setItem("token", token);
    localStorage.setItem("email", email.email);
    setIsLoggedIn(true);
    setUser({ email });
  };


  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    sessionStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
