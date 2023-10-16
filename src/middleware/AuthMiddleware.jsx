import { useNavigate, Outlet } from 'react-router';
import { useEffect } from 'react';
import { useAuth } from '@/utils/AuthContext';

function AuthMiddleware() {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      const navigateLogin = () => {
        navigate('/login');
      };

      navigateLogin();
    }
  }, []);

  return <Outlet />;
}

export default AuthMiddleware;
