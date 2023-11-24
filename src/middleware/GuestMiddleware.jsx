import { useNavigate, Outlet } from 'react-router';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withAuthentication } from '@/utils/AuthContext';

function GuestMiddleware({ isLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const navigateHome = () => {
        navigate('/');
      };
      navigateHome();
    }
  }, []);

  return (
    <div>
      { !isLoggedIn ? (<Outlet data-testid="outlet" />) : '' }
    </div>
  );
}

GuestMiddleware.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default withAuthentication(GuestMiddleware);
