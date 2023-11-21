import { FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { Avatar } from 'antd';
import jwt from '@/auth/useJwt';
import { getUserData } from '@/utils/common';

const me = getUserData.value;

const logout = () => {
  jwt.logout().then((response) => {
    if (response.status === 200) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userData');
      window.location.replace('/');
    }
  });
};

export default [
  {
    icon: (
      <Avatar className="cursor-pointer bg-teal-700 flex items-center">
        {me?.avatar ?? <FaUserAlt size={20} />}
      </Avatar>
    ),
    label: <h4 className="font-bold">{me?.name}</h4>,
    key: '/profile',
    path: '/profile',
  },
  {
    icon: <IoSettings />,
    label: 'Settings',
    key: '/profile/settings/general',
    path: '/profile/settings/general',
  },
  {
    icon: <FaSignOutAlt />,
    label: (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/no-static-element-interactions
      <a
        type="link"
        onClick={logout}
        onKeyDown={() => {}}
      >
        Logout
      </a>
    ),
  },
];
