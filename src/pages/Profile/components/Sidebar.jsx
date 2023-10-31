import { Menu } from 'antd';
import { useNavigate } from 'react-router';
import sidebarItems from './sidebarItems';

function Sidebar() {
  const navigate = useNavigate();
  const onClick = (item) => {
    navigate(item.item.props.path);
  };

  return (
    <Menu
      onClick={onClick}
      mode="inline"
      defaultSelectedKeys={['profile']}
      items={sidebarItems}
    />
  );
}

export default Sidebar;
