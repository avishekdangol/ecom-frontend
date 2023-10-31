import PropTypes from 'prop-types';
// antd imports
import {
  Layout, theme, Space, ConfigProvider,
} from 'antd';
import Navbar from '@/components/navbar/Index';
import AppFooter from '@/components/footer/Index';
import '@/scss/index.scss';

const { Header, Content, Footer } = Layout;

/**
 *  style for  layout for now
 * @header
 * @content
 * @footer
 *  */

const headerStyle = {
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
};

const contentStyle = {
  minHeight: '70vh',
  color: '#000',
};

const footerStyle = {
  color: '#f1f1f1',
  padding: 0,
};

/* end here */

function AppLayout({ children }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
          {/* header section */}
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              ...headerStyle,
            }}
          >
            <Navbar />
          </Header>
          {/* end  here */}

          {/* content section */}
          <Content style={{ ...contentStyle }}>{children}</Content>
          {/* end here */}

          {/* footer  section */}
          <Footer style={{ ...footerStyle }}>
            <AppFooter />
          </Footer>
        </Layout>
      </Space>
    </ConfigProvider>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
