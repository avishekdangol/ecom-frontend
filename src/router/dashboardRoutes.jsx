import AdminMiddleware from '@/middleware/AdminMiddleware';
import Dashboard from '@/pages/Dashboard/Index';
import Categories from '@/pages/Dashboard/Categories/Index';
import Products from '@/pages/Dashboard/Products/Index';

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: <Dashboard />,
  },
  {
    path: '/categories',
    name: 'categories',
    component: <Categories />,
  },
  {
    path: '/products',
    name: 'products',
    component: <Products />,
  },
];

const dashboardRoutes = routes.map((route) => ({
  ...route,
  path: `/admin${route.path}`,
  middleware: ['admin'],
  element: <AdminMiddleware />,
}));

export default dashboardRoutes;
