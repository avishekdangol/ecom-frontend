import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DecodeBase64 } from "./base64";

const AuthContext = createContext();

const hasUserData = () => {
  const userData = DecodeBase64(JSON.parse(localStorage.getItem("userData")));
  console.log(userData);
  if (userData && userData.uuid) return true;
  return false;
};

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (hasUserData()) setIsLoggedIn(true);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
