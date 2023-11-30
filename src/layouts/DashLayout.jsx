import PropTypes from 'prop-types';
// antd imports
import {
  Layout, Space, ConfigProvider, Row, Col,
} from 'antd';
import Navbar from '@/components/dashboard/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';
import '@/scss/index.scss';
import '@/scss/common.scss';

const { Content } = Layout;

/**
 *  style for  layout for now
 * @header
 * @content
 * @footer
 *  */

const headerStyle = {
  backgroundColor: '#102925',
  color: '#e6e6e6',
  padding: '10px 50px',
};

const sidebarStyle = {
  backgroundColor: '#112c28',
  minHeight: '92.2vh',
};

const contentStyle = {
  minHeight: '70vh',
  color: '#000',
};

/* end here */

function AppLayout({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'var(--font_family)',
        },
      }}
    >
      <Space
        direction="vertical"
        className="bg-default"
        style={{
          width: '100%',
        }}
      >
        <Layout>
          {/* Header Section */}
          <header
            style={{ ...headerStyle }}
          >
            <Navbar />
          </header>

          <Row>
            {/* Sidebar Section */}
            <Col
              span={3}
              style={{ ...sidebarStyle }}
            >
              <Sidebar />
            </Col>

            {/* Content Section */}
            <Col span={21}>
              <Content style={{ ...contentStyle }}>{children}</Content>
            </Col>
          </Row>
        </Layout>
      </Space>
    </ConfigProvider>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
