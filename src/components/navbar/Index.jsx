import "@/scss/navbar.scss"
import { Menu } from "antd";
import navMenu from "@/navigation/navMenu";

const Navbar = () => {
  return (
    <>
      {/* <h1>This is Navbar</h1>
      <img className="logo" src="assets/images/logo.png" alt="" /> */}
       <Menu
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{paddingInline: 0}}
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
        />
    </>
  );
};

export default Navbar;
