import {
  Dropdown, Space, Avatar,
} from 'antd';
import { BiSolidUser } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import getUserData from '@/utils/common';
import items from './userMenuList';

function UserMenu() {
  const me = getUserData();
  const navigate = useNavigate();
  const handleMenuClick = (e) => {
    navigate(e.item.props.path);
  };

  return (
    <Dropdown
      menu={{ items, onClick: handleMenuClick }}
      placement="bottom"
      trigger="click"
    >
      <Space>
        <Avatar className="cursor-pointer bg-teal-700 flex items-center ml-4">
          {me.avatar ? me.avatar : <BiSolidUser size={20} />}
        </Avatar>
      </Space>
    </Dropdown>
  );
}

export default UserMenu;
