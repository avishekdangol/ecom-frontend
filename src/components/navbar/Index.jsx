import "@/scss/navbar.scss";
import { Row, Col, Button, Input, Tooltip, Alert, Spin, Badge } from "antd";
import { FiSearch } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "@/utils/AuthContext";
import UserMenu from "./components/UserMenu";
import NavMenu from "./components/NavMenu";
import jwt from "@/auth/useJwt";

import { getUserData } from "@/utils/common";
import showNotification from "@/utils/Toasts";
import CartDrawer from "../../redux/features/cart/component/cart";
// import { useCart } from "@/hooks/useCart";

function Navbar() {
  const me = getUserData.value;
  const { isLoggedIn } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  // const [totalAmount, totalCount, cart, status , errors] = useCart();
  const isProcessing = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  // opening and closing feature for cart drawer
  const showCart = () => {
    setOpenCart(true);
  };

  const onClose = () => {
    setOpenCart(false);
  };

  // resend email verification link
  const resendVerificationLink = () => {
    setProcessing(true);
    jwt
      .resendEmailVerification()
      .then((response) => {
        if (response.data.status === 401)
          showNotification("error", "Error", response);
        else {
          showNotification("success", "Success", response);
          setEmailSent(true);
        }
      })
      .catch(({ response }) => {
        showNotification("error", "Error", response);
      })
      .finally(() => {
        setProcessing(false);
      });
  };

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
                src="/assets/images/logo.png"
                width={94}
                alt=""
              />
            </Link>
          </div>
        </Col>

        <Col span={8}>
          <div className="flex justify-end items-center h-full">
            <Tooltip title="Wishlist">
              <Badge>
                <Button className="px-2" type="link">
                  <AiOutlineHeart
                    size={18}
                    className="text-black hover:text-slate-500"
                  />
                </Button>
              </Badge>
            </Tooltip>

            <Tooltip title="Cart">
              <Button className="px-2" type="link">
                <AiOutlineShoppingCart
                  size={18}
                  className="text-black hover:text-slate-500"
                  onClick={showCart}
                />
              </Button>
            </Tooltip>

            {isLoggedIn && me?.name ? (
              <UserMenu />
            ) : (
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
      {me && !me.emailVerifiedAt ? (
        <Alert
          className="z-10"
          message="It seems that you haven't verified your email yet. Please verify your email to enjoy all the benefits!"
          type="warning"
          showIcon
          closable
          action={
            emailSent ? (
              ""
            ) : (
              <Button
                size="small"
                type="primary"
                className="w-[196px]"
                onClick={resendVerificationLink}
              >
                {processing ? (
                  <Spin indicator={isProcessing} />
                ) : (
                  "Resend Verification Link"
                )}
              </Button>
            )
          }
        />
      ) : (
        ""
      )}
      {/* cart drawer compoenet */}
      <CartDrawer
        title="Your Cart Preview."
        onClose={onClose}
        open={openCart}
      />
    </>
  );
}

export default Navbar;
