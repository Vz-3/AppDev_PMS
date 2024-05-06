import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// Create an authentication context
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your application with
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle user login
  const login = async (credentials) => {
    try {
      const response = await axios.post("/api/login", credentials);
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);
        console.log("Login successful:", response.data);
      } else {
        throw new Error("Token not provided");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoggedIn(false); // Ensure to handle error state
    }
  };
  

  // Function to handle user logout
  const logout = () => {
    // Remove the JWT from local storage
    localStorage.removeItem("token");

    // Update the authentication state
    setIsLoggedIn(false);
  };

  // Value provided by the context
  const authContextValue = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
