import { FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { Avatar } from 'antd';
import jwt from '@/auth/useJwt';

const logout = () => {
  jwt.logout().then((response) => {
    if (response.status === 200) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userData');
      window.location.replace('/');
    }
  });
};

const userMenuList = (userData) => [
  {
    icon: (
      <Avatar className="cursor-pointer bg-teal-700 flex items-center">
        {userData?.avatar ?? <FaUserAlt size={20} />}
      </Avatar>
    ),
    label: <h4 className="font-bold">{userData?.name}</h4>,
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
      <span
        type="link"
        onClick={logout}
        onKeyDown={() => {}}
      >
        Logout
      </span>
    ),
  },
];

export default userMenuList;
