import Home from '@/pages/Home/Index';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';

const routes = [
  {
    path: '/',
    name: 'Home',
    element: <Home />,
  },
  ...authRoutes,
  ...userRoutes,
];

export default routes;
