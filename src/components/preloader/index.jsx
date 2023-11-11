import { Spin } from "antd";

const Preloader = () => {
  return (
    <>
      <section className="h-screen flex items-center justify-center">
        <Spin size="large" />
      </section>
    </>
  );
};

export default Preloader;
