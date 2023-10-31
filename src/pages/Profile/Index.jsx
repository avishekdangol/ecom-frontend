import { Row, Col } from 'antd';

import { useLocation } from 'react-router';
import AppLayout from '@/layouts/Layout';
import Sidebar from './components/Sidebar';
import ProfileInfo from './components/ProfileInfo/Index';
import Recommendations from './components/ProfileInfo/Recommendations';
import Settings from './components/Settings/Index';

function Profile() {
  const location = useLocation();
  const routeName = location?.pathname;

  const getComponent = () => {
    switch (routeName) {
      case '/profile/settings':
        return <Settings />;
      default:
        return <ProfileInfo />;
    }
  };

  return (
    <AppLayout>
      <Row>
        {/* Sidebar */}
        <Col span={4}>
          <Sidebar activeComponentPath={routeName} />
        </Col>

        {/* Main Content */}
        <Col span={12}>
          { getComponent() }
        </Col>

        {/* Right Side */}
        <Col span={8}>
          <Recommendations />
        </Col>
      </Row>
    </AppLayout>
  );
}

export default Profile;
