import PropTypes from "prop-types";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <section>{children}</section>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
