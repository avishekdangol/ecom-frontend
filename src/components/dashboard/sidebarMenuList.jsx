import { MdDashboard, MdCategory } from 'react-icons/md';

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
];

export default sidebarMenuList;
