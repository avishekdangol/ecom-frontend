import Products from '@/pages/Products/Index';
import Wishlist from '@/pages/Wishlist';

const userRoutes = [
  {
    path: '/products',
    name: 'products',
    element: <Products />,
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    element: <Wishlist />,
  },
];

export default userRoutes;
