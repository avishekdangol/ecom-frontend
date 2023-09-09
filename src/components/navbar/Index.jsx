import "@/scss/navbar.scss"
import { Row, Col, Button, Dropdown, Input } from "antd";
import { HiMenuAlt4 } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const navigateHome = () => navigate("/");

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];

  return (
    <>
      {/* <h1>This is Navbar</h1> */}
        <Row className="justify-between">
          <Col span={8}>
            <Row className="items-center">
              <Col className="mr-3">
                <Dropdown menu={{ items }} placement="bottom" trigger="click" arrow>
                  <Button className="flex items-center justify-center" shape="round">
                    <HiMenuAlt4 className="me-1" />
                    Menu
                  </Button>
                </Dropdown>
              </Col>
              <Col>
                <Input className="search-bar rounded-2xl" prefix={<FiSearch />} placeholder="Search" />
              </Col>
            </Row>
          </Col>

          <Col span={8} className="w-100">
            <div className="flex justify-center items-center">
              <img className="logo cursor-pointer" src="assets/images/logo.png" width={120} alt="" onClick={navigateHome} />
            </div>
          </Col>

          <Col span={8}>
            <div className="flex justify-end items-center h-full">
              <Button className="px-2" type="link">
                <AiOutlineHeart size={18} className="text-black" />
              </Button>

              <Button className="px-2" type="link">
                <AiOutlineShoppingCart size={18} className="text-black" />
              </Button>

              <Button className="ms-4 flex items-center justify-center" shape="round">
                <BiUser className="me-1" />
                Login
              </Button>
            </div>
          </Col>
        </Row>
    </>
  );
};

export default Navbar;
