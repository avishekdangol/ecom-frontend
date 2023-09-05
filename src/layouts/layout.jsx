import PropTypes from "prop-types";
// antd imports
import { Layout } from "antd";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const AppLayout = ({ children }) => {
  return (
    <>
      <Layout>
        <header>
          <Navbar />
        </header>
        <section>{children}</section>
        <Footer />
      </Layout>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;
