import Home from '@/pages/Home/Index';
import authRoutes from './authRoutes';

const routes = [
  {
    path: '/',
    name: 'Home',
    element: <Home />,
  },
  ...authRoutes,
];

export default routes;
