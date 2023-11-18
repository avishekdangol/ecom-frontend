import { FaUserAlt } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { BiNews, BiLock } from 'react-icons/bi';

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
    children: [
      {
        icon: <BiNews />,
        label: 'General',
        key: '/profile/settings/general',
        path: '/profile/settings/general',
      },
      {
        icon: <BiLock />,
        label: 'Change Password',
        key: '/profile/settings/password',
        path: '/profile/settings/password',
      },
    ],
  },
];
