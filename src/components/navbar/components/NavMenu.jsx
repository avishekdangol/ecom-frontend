import { useState } from "react";
import { Button, Row, Col } from "antd";
import { HiMenuAlt4 } from "react-icons/hi";

function NavMenu() {
  const [toggle, setToggle] = useState(true);
  const toggleFunction = () => {
    setToggle(!toggle);
  };
  return (
    <section className="dropdown">
      <Button
        className="flex items-center justify-center"
        shape="round"
        onClick={toggleFunction}
      >
        <HiMenuAlt4 className="me-1" />
        Menu
      </Button>
      <div
        className={`absolute z-50 bg-white dropdown-content rounded-xl p-5 ${
          toggle ? "closed" : "open"
        } `}
      >
        <Row gutter={[0, 2]}>
          <Col md={6} sm={8}>
            <ul>
              <h5>Men</h5>
              <li>
                <a href="#">Casual</a>
              </li>
              <li>
                <a href="#">90s</a>
              </li>
              <li>
                <a href="#">Boots</a>
              </li>
              <li>
                <a href="#">Loafer</a>
              </li>
            </ul>
          </Col>
          <Col md={6} sm={8}>
            <ul>
              <h4>Women</h4>
              <li>
                <a href="#">Flats</a>
              </li>
              <li>
                <a href="#">Heels</a>
              </li>
              <li>
                <a href="#">Mules</a>
              </li>
              <li>
                <a href="#">Shippers</a>
              </li>
            </ul>
          </Col>
          <Col md={6} sm={8}>
            <ul>
              <h4>Unisex</h4>
              <li>
                <a href="#">Sneaker</a>
              </li>
              <li>
                <a href="#">Scandals</a>
              </li>
              <li>
                <a href="#">Hiking</a>
              </li>
              <li>
                <a href="#">Sports</a>
              </li>
            </ul>
          </Col>
          <Col md={6} sm={24}>
            <img
              src="/assets/menu/shoes.jpg"
              alt=""
              className="image-objects-fit"
            />
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default NavMenu;
