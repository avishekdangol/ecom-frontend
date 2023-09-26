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
    middleware: ['guest'],
    element: <GuestMiddleware />,
    component: <Auth />,
  },
  {
    path: '/register',
    name: 'Register',
    middleware: ['guest'],
    element: <GuestMiddleware />,
    component: <Auth />,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    middleware: ['guest'],
    element: <GuestMiddleware />,
    component: <Auth />,
  },
];

export default routes;
