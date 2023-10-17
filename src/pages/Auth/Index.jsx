import { Link, useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import ResetPassword from '@/pages/Auth/ResetPassword';

function Auth() {
  const location = useLocation();
  const routeName = location?.pathname;

  const getComponent = () => {
    switch (routeName) {
      case '/login':
        return <Login />;
      case '/forgot-password':
        return <ForgotPassword />;
      case '/password/reset':
        return <ResetPassword />;
      default:
        return <Register />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen mx-auto bg-default">
      <div className={`border rounded-xl shadow drop-shadow-lg h-[450px] bg-white p-4 ${routeName === '/register' ? 'w-2/5' : 'w-80'}`}>
        <Link to="/">
          <img className="logo cursor-pointer mx-auto mb-8" src="/assets/images/logo-color.png" width={150} alt="" />
        </Link>

        { getComponent() }
      </div>
    </div>
  );
}

export default Auth;
