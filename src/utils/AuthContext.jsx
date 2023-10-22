import React, {
  createContext, useContext, useState,
} from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

const hasUserData = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (userData && userData.uuid) return true;
  return false;
};

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(hasUserData());

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
