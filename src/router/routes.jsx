import Home from '@/pages/Home/Index';
import Auth from '@/pages/Auth/Index';
import GuestMiddleware from '../middleware/GuestMiddleware';

const routes = [
  {
    path: '/',
    name: 'Home',
    element: <Home />,
  },
  {
    path: '/login',
    name: 'Login',
    element: <GuestMiddleware component={<Auth />} />,
  },
  {
    path: '/register',
    name: 'Register',
    element: <GuestMiddleware component={<Auth />} />,
  },
];

export default routes;
