import { useNavigate, Outlet } from 'react-router';
// import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useAuth } from '@/utils/AuthContext';

function GuestMiddleware() {
  const { isLoggedIn } = useAuth();
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
      {
        !isLoggedIn ? (<Outlet />) : ''
      }
    </div>
  );
}

export default GuestMiddleware;
