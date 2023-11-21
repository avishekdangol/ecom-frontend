import React, {
  createContext, useContext,
} from 'react';
import PropTypes from 'prop-types';
import { effect, signal } from '@preact/signals-react';
import { decodeBase64 } from '@/utils/common';

const AuthContext = createContext();
const isLoggedIn = signal(false);

effect(() => {
  const data = localStorage.getItem('userData');
  if (data) {
    const userData = JSON.parse(decodeBase64(data));
    if (userData && userData.uuid) isLoggedIn.value = true;
    else isLoggedIn.value = false;
  }
});

const login = () => { isLoggedIn.value = true; };

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn.value, login }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
