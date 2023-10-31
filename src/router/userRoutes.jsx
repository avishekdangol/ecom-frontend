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
    path: '/profile/settings',
    name: 'settings',
    middleware: ['auth'],
    element: <AuthMiddleware />,
    component: <Profile />,
  },
];

export default userRoutes;
