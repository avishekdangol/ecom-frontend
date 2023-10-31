import { Menu } from 'antd';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import sidebarItems from './sidebarItems';

function Sidebar({ activeComponentPath }) {
  const navigate = useNavigate();
  const onClick = (item) => {
    navigate(item.key);
  };

  return (
    <Menu
      onClick={onClick}
      mode="inline"
      defaultSelectedKeys={activeComponentPath}
      items={sidebarItems}
    />
  );
}

Sidebar.propTypes = {
  activeComponentPath: PropTypes.string.isRequired,
};

export default Sidebar;
