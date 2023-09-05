import PropTypes from "prop-types";

const GuestLayout = ({ children }) => {
  return <>{children}</>;
};

GuestLayout.propTypes = {
  children: PropTypes.node,
};

export default GuestLayout;
