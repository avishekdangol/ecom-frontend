import { Button, Dropdown } from 'antd';
import { HiMenuAlt4 } from 'react-icons/hi';

function NavMenu() {
  const items = [
    {
      key: '1',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottom" trigger="click" arrow>
      <Button
        className="flex items-center justify-center"
        shape="round"
      >
        <HiMenuAlt4 className="me-1" />
        Menu
      </Button>
    </Dropdown>
  );
}

export default NavMenu;
