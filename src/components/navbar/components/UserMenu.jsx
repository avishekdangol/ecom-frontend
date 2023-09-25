import {
  Dropdown, Button, Space, Avatar,
} from 'antd';
import { BiSolidUser } from 'react-icons/bi';
import getUserData from '@/utils/common';
import items from './userMenuList';

function UserMenu() {
  const me = getUserData();

  return (
    <Dropdown menu={{ items }} trigger="click">
      <Space>
        <Avatar className="cursor-pointer bg-teal-700 flex items-center ml-4">
          {me.avatar ? me.avatar : <BiSolidUser size={20} />}
        </Avatar>
      </Space>
    </Dropdown>

  );
}

export default UserMenu;
