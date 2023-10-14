import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "antd";
import { HiMenuAlt4 } from "react-icons/hi";

/**
 * @static menu item for mega menu
 */
const data = {
  men: ["Casual", "90s", "Boots", "Loafers"],
  women: ["Flats", "Heels", "Mules", "Slippers"],
  unisex: ["Sneaker", "Scandals", "Hikings", "Sports"],
  image: {
    url: "#",
    img: "assets/menu/shoes.jpg",
  },
};

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
            <ul className="p-0">
              <h5>Men</h5>
              {data.men.map((li) => (
                <li key={li}>
                  <Link to="#">{li}</Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col md={6} sm={8}>
            <ul>
              <h4>Women</h4>
              {data.women.map((li) => (
                <li key={li}>
                  <Link to="#">{li}</Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col md={6} sm={8}>
            <ul>
              <h4>Unisex</h4>
              {data.unisex.map((li) => (
                <li key={li}>
                  <Link to="#">{li}</Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col md={6} sm={24}>
            <Link to={data.image.url}>
              <img src={data.image.img} alt="" className="image-objects-fit" />
            </Link>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default NavMenu;
