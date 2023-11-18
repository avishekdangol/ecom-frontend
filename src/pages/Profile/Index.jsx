import { Row, Col } from 'antd';

import { useLocation } from 'react-router';
import AppLayout from '@/layouts/Layout';
import Sidebar from './components/Sidebar';
import ProfileInfo from './components/ProfileInfo/Index';
import Settings from './components/Settings/Index';
import PasswordSetting from './components/Settings/PasswordSettings';

function Profile() {
  const location = useLocation();
  const routeName = location?.pathname;

  const getComponent = () => {
    switch (routeName) {
      case '/profile/settings/general':
        return <Settings />;
      case '/profile/settings/password':
        return <PasswordSetting />;
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
        <Col span={20}>
          { getComponent() }
        </Col>
      </Row>
    </AppLayout>
  );
}

export default Profile;
