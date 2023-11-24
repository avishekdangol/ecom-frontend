import Dashboard from '@/pages/Dashboard/Index';
import AdminMiddleware from '@/middleware/AdminMiddleware';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    middleware: ['admin'],
    element: <AdminMiddleware />,
    component: <Dashboard />,
  },
];

export default dashboardRoutes;
