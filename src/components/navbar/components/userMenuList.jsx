import { FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
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

export default [
  {
    icon: <FaUserAlt />,
    label: 'Profile',
    component: '',
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
