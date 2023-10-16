import Auth from '@/pages/Auth/Index';
import GuestMiddleware from '../middleware/GuestMiddleware';
import VerifyEmail from '../pages/Auth/VerifyEmail';

const authRoutes = [
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
  {
    path: '/email/verify',
    name: 'VerifyEmail',
    middleware: ['auth'],
    element: <VerifyEmail />,
  },
];

export default authRoutes;
