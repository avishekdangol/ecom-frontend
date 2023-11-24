import React, {
  createContext, useContext,
} from 'react';
import PropTypes from 'prop-types';
import { effect, signal } from '@preact/signals-react';
import { decodeBase64 } from '@/utils/common';

const AuthContext = createContext();
const isLoggedIn = signal(false);
const userData = signal({});

effect(() => {
  const data = localStorage.getItem('userData');
  if (data) {
    const decodedData = JSON.parse(decodeBase64(data));
    if (decodedData && decodedData.uuid) {
      isLoggedIn.value = true;
      userData.value = decodedData;
    } else isLoggedIn.value = false;
  }
});

const login = () => { isLoggedIn.value = true; };

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn.value,
      userData: userData.value,
      login,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line func-names
export const withAuthentication = (Component) => function (props) {
  const auth = useAuth();
  return <Component {...props} isLoggedIn={auth.isLoggedIn} userData={auth.userData} />;
};
