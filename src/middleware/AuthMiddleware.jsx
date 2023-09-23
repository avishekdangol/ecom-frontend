import { Routes, Route, useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { useAuth } from '@/utils/AuthContext';

function AuthMiddleware({ component: Component, ...rest }) {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate('/login');
  };

  if (!isLoggedIn) {
    return navigateLogin();
  }

  return (
    <Routes>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Route {...rest} render={(props) => <Component {...props} />} />
    </Routes>
  );
}

AuthMiddleware.propTypes = {
  component: PropTypes.node.isRequired,
};

export default AuthMiddleware;
