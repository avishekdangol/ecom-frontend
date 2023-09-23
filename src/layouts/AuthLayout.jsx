import PropTypes from 'prop-types';

function GuestLayout({ children }) {
  return <>{children}</>;
}

GuestLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GuestLayout;
