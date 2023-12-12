import Home from '@/pages/Home/Index';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import productRoutes from './productRoutes';
import dashboardRoutes from './dashboardRoutes';

const routes = [
  {
    path: '/',
    name: 'Home',
    element: <Home />,
  },
  ...authRoutes,
  ...userRoutes,
  ...productRoutes,
  ...dashboardRoutes,
];

export const getRouteName = (path) => routes.find((route) => route.path === path)?.name;

export default routes;
