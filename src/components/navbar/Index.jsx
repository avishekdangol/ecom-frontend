import '@/scss/navbar.scss';
import {
  Row, Col, Button, Input, Tooltip, Alert,
} from 'antd';
import { FiSearch } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useAuth } from '@/utils/AuthContext';
import UserMenu from './components/UserMenu';
import NavMenu from './components/NavMenu';
import getUserData from '@/utils/common';

function Navbar() {
  const me = getUserData();
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Row className="justify-between">
        <Col span={8}>
          <Row className="items-center">
            <Col className="mr-3">
              <NavMenu />
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
                width={94}
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

            {isLoggedIn
              ? (<UserMenu />)
              : (
                <Link
                  className="ms-4 flex items-center justify-center"
                  shape="round"
                  to="/login"
                >
                  <BiUser className="me-1" />
                  Login | Register
                </Link>
              )}
          </div>
        </Col>
      </Row>
      {
        !me.emailVerifiedAt ? (
          <Alert
            className="z-10"
            message="It seems that you haven't verified your email yet. Please verify your email to enjoy all the benefits!"
            type="warning"
            showIcon
          />
        ) : ('')
      }
    </>
  );
}

export default Navbar;
