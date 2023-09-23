import { Routes, Route, useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { useAuth } from '@/utils/AuthContext';

function GuestMiddleware({ component: Component, ...rest }) {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();
  const navigateHome = () => {
    navigate('/');
  };

  if (isLoggedIn) {
    return navigateHome();
  }

  return (
    <Routes>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Route {...rest} render={(props) => <Component {...props} />} />
    </Routes>
  );
}

GuestMiddleware.propTypes = {
  component: PropTypes.node.isRequired,
};

export default GuestMiddleware;
