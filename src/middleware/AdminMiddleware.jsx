import { useNavigate, Outlet } from 'react-router';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withAuthentication } from '@/utils/AuthContext';

function AdminMiddleware({ isLoggedIn, userData }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || userData.role === 'member') {
      const navigateLogin = () => {
        navigate('/');
      };

      navigateLogin();
    }
  }, []);

  return (
    <div>
      { isLoggedIn && userData.role !== 'member' ? (<Outlet />) : '' }
    </div>
  );
}

AdminMiddleware.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
};

export default withAuthentication(AdminMiddleware);
