import { Row, Col } from 'antd';

import AppLayout from '@/layouts/Layout';
import Sidebar from './components/Sidebar';
import ProfileInfo from './components/ProfileInfo';
import Recommendations from './components/Recommendations';

function Profile() {
  return (
    <AppLayout>
      <Row>
        {/* Sidebar */}
        <Col span={4}>
          <Sidebar />
        </Col>

        {/* Main Content */}
        <Col span={12}>
          <ProfileInfo />
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
