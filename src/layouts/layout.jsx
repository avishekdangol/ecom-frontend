import PropTypes from "prop-types";
// antd imports
import { Layout, theme, Space } from "antd";
import Navbar from "../components/navbar";
import AppFooter from "../components/footer";

const { Header, Content, Footer } = Layout;

/**
 *  style for  layout for now
 * @header
 * @content
 * @footer
 *  */

const headerStyle = {
  color: "#000",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#fff",
};

const contentStyle = {
  minHeight: "100vh",
  color: "#000",
  backgroundColor: "#fff",
};

const footerStyle = {
  textAlign: "center",
  color: "#000",
  backgroundColor: "#fff",
};

/* end here */

const AppLayout = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Space
        direction="vertical"
        style={{
          width: "100%",
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
          <Footer style={{ textAlign: "center", ...footerStyle }}>
            <AppFooter />
          </Footer>
        </Layout>
      </Space>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;
