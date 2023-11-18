import Profile from '@/pages/Profile/Index';
import AuthMiddleware from '@/middleware/AuthMiddleware';

const userRoutes = [
  {
    path: '/profile',
    name: 'profile',
    middleware: ['auth'],
    element: <AuthMiddleware />,
    component: <Profile />,
  },
  {
    path: '/profile/settings/general',
    name: 'settings',
    middleware: ['auth'],
    element: <AuthMiddleware />,
    component: <Profile />,
  },
  {
    path: '/profile/settings/password',
    name: 'password-settings',
    middleware: ['auth'],
    element: <AuthMiddleware />,
    component: <Profile />,
  },
];

export default userRoutes;
