import { Col, Row } from 'antd';
import { TiHome } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { getUserData } from '@/utils/common';
import UserMenu from '@/components/navbar/components/UserMenu';

function Navbar() {
  const me = getUserData?.value;
  return (
    <Row className="justify-between items-center">
      <Col>
        <Link
          to="/"
          className="flex items-center"
        >
          <TiHome className="text-2xl mb-1" />
          {' '}
          <h3 className="ml-1">Pahichaan</h3>
        </Link>
      </Col>

      <Col>
        <div className="flex items-center">
          <div className="text-right">
            <h3>{me?.name}</h3>
            <p className="capitalize mb-0">{me?.role}</p>
          </div>
          <UserMenu />
        </div>
      </Col>
    </Row>
  );
}

export default Navbar;
