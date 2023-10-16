import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import { HiMenuAlt4 } from 'react-icons/hi';

/**
 * @static menu item for mega menu
 */
const data = {
  categories: [
    { id: 1, title: 'Men', subCategories: ['Casual', '90s', 'Boots', 'Loafers'] },
    { id: 2, title: 'Women', subCategories: ['Flats', 'Heels', 'Mules', 'Slippers'] },
    { id: 3, title: 'Unisex', subCategories: ['Sneaker', 'Scandals', 'Hikings', 'Sports'] },
  ],
  image: {
    url: '#',
    img: 'assets/menu/shoes.jpg',
  },
};

function NavMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <section className="dropdown">
      <Button
        className="flex items-center justify-center"
        shape="round"
        onClick={toggleMenu}
      >
        <HiMenuAlt4 className="me-1" />
        Menu
      </Button>
      <div className={`nav-menu absolute z-50 bg-white dropdown-content rounded-xl p-5 ${showMenu && 'show'} `}>
        <Row gutter={[0, 2]}>
          {
            data.categories.map((category) => (
              <Col key={category.id} md={6} sm={8}>
                <h5>{category.title}</h5>
                <ul className="p-0">
                  {category.subCategories.map((subCategory) => (
                    <li key={subCategory}>
                      <Link to="#">{subCategory}</Link>
                    </li>
                  ))}
                </ul>
              </Col>
            ))
          }
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
