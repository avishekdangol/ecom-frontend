import PropTypes from "prop-types";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Container } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
