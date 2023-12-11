import { MdDashboard, MdCategory } from 'react-icons/md';
import { FaBoxArchive } from 'react-icons/fa6';

const sidebarMenuList = [
  {
    title: 'Dashboard',
    icon: <MdDashboard />,
    path: '/admin/dashboard',
  },
  {
    title: 'Categories',
    icon: <MdCategory />,
    path: '/admin/categories',
  },
  {
    title: 'Products',
    icon: <FaBoxArchive />,
    path: '/admin/products',
  },
];

export default sidebarMenuList;
