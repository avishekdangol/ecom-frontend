import { useNavigate, Outlet } from 'react-router';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withAuthentication } from '@/utils/AuthContext';

function AdminMiddleware({ isLoggedIn, userData }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && userData.roles !== 'member') {
      const navigateLogin = () => {
        navigate('/');
      };

      navigateLogin();
    }
  }, []);

  return (
    <div>
      { isLoggedIn && userData.roles !== 'member' ? (<Outlet />) : '' }
    </div>
  );
}

AdminMiddleware.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  userData: PropTypes.object.isRequired,
};

export default withAuthentication(AdminMiddleware);
