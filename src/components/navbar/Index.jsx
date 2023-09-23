import '@/scss/navbar.scss';
import {
  Row, Col, Button, Dropdown, Input, Tooltip,
} from 'antd';
import { HiMenuAlt4 } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Navbar() {
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
    <Row className="justify-between">
      <Col span={8}>
        <Row className="items-center">
          <Col className="mr-3">
            <Dropdown menu={{ items }} placement="bottom" trigger="click" arrow>
              <Button
                className="flex items-center justify-center"
                shape="round"
              >
                <HiMenuAlt4 className="me-1" />
                Menu
              </Button>
            </Dropdown>
          </Col>
          <Col>
            <Input
              className="search-bar rounded-2xl"
              prefix={<FiSearch />}
              placeholder="Search"
            />
          </Col>
        </Row>
      </Col>

      <Col span={8}>
        <div className="flex justify-center items-center">
          <Link to="/">
            <img
              className="logo cursor-pointer"
              src="assets/images/logo.png"
              width={120}
              alt=""
            />
          </Link>
        </div>
      </Col>

      <Col span={8}>
        <div className="flex justify-end items-center h-full">
          <Tooltip title="Wishlist">
            <Button className="px-2" type="link">
              <AiOutlineHeart
                size={18}
                className="text-black hover:text-slate-500"
              />
            </Button>
          </Tooltip>

          <Tooltip title="Cart">
            <Button className="px-2" type="link">
              <AiOutlineShoppingCart
                size={18}
                className="text-black hover:text-slate-500"
              />
            </Button>
          </Tooltip>

          <Link
            className="ms-4 flex items-center justify-center"
            shape="round"
            to="/login"
          >
            <BiUser className="me-1" />
            Login | Register
          </Link>
        </div>
      </Col>
    </Row>
  );
}

export default Navbar;
