import { useNavigate, Outlet } from 'react-router';
// import PropTypes from 'prop-types';
import { useAuth } from '@/utils/AuthContext';

function GuestMiddleware() {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();
  const navigateHome = () => {
    navigate('/');
  };

  if (isLoggedIn) {
    return navigateHome();
  }

  return <Outlet />;
}

// GuestMiddleware.propTypes = {
//   component: PropTypes.node.isRequired,
// };

export default GuestMiddleware;
