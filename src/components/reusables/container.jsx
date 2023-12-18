import PropTypes from "prop-types";

const Container = ({ children }) => {
  return (
    <>
      <section className="container mx-auto w-11/12 my-[20px]">{children}</section>
    </>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
