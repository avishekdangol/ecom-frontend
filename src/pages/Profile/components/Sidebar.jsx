import { Menu } from 'antd';
import sidebarItems from './sidebarItems';

function Sidebar() {
  const onClick = () => {};

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
