import { FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { MdDashboard } from 'react-icons/md';
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
    label: (
      <div>
        <h4 className="font-bold">{userData?.name}</h4>
        <p className="capitalize">{userData?.role !== 'member' ? userData.role : ''}</p>
      </div>
    ),
    key: '/profile',
    path: '/profile',
  },
  ...(userData.role !== 'member'
    ? [window.location.pathname !== '/admin/dashboard' && {
      icon: <MdDashboard />,
      label: 'Dashboard',
      key: '/admin/dashboard',
      path: '/admin/dashboard',
    }] : []),
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
