import { FaUserAlt } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';

export default [
  {
    icon: <FaUserAlt />,
    label: 'My Profile',
    key: '/profile',
    path: '/profile',
  },
  {
    icon: <IoSettings />,
    label: 'Settings',
    key: '/profile/settings',
    path: '/profile/settings',
  },
];
