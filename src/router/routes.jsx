import Home from '@/pages/Home/Index';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import productRoutes from './productRoutes';

const routes = [
  {
    path: '/',
    name: 'Home',
    element: <Home />,
  },
  ...authRoutes,
  ...userRoutes,
  ...productRoutes,
];

export default routes;
