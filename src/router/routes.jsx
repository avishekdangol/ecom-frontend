import Home from '@/pages/Home/Index';
import Auth from '@/pages/Auth/Index';

const routes = [
  {
    path: '/',
    name: 'Home',
    element: <Home />,
  },
  {
    path: '/:authType',
    name: 'Auth',
    element: <Auth />,
  },
];

export default routes;
