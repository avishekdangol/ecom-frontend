import PropType from "prop-types";

import { Drawer, Divider, Card, Button } from "antd";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

import ProductCart from "./product";

const items = new Array(2).fill().map((arr, index) => ({
  id: index,
  title: "Nike Air",
  price: 180.0,
  previousPrice: 249.0,
  colors:
    index % 3
      ? ["bg-[#fff]", "bg-[#df6e44]", "bg-[#000]"]
      : ["bg-[#000]", "bg-[#ae64f0]"],
  image:
    "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e9d41cd4-a2c5-4ca7-a3aa-f4bf597658d0/custom-nike-air-force-1-mid-by-you-shoes.png",
  isNew: !!(index % 2),
  isHot: !!(index % 3),
}));

const CartDrawer = ({ title, onClose, open }) => {
  return (
    <>
      <Drawer title={title} onClose={onClose} open={open}>
        {items.map((item) => (
          <>
            <ProductCart
              key={`${item.id}-${item.title}`}
              title={item.title}
              image={item.image}
              price={item.price}
              previousPrice={item.previousPrice}
              colors={item.colors}
              isHot={item.isHot}
              isNew={item.isNew}
            />
          </>
        ))}

        <Divider />
        <Card>
          <h1 className="my-1">Total: $200</h1>
          <Button
            className="primary-btn w-full flex justify-center items-center mb-2"
            shape="round"
            type="primary"
          >
            <MdOutlineShoppingCartCheckout className="mr-1 mb-1" />
            <h6>Checkout</h6>
          </Button>
          <Button
            className="primary-btn w-full flex justify-center items-center mb-2"
            shape="round"
            type="primary"
          >
            <MdOutlineShoppingCartCheckout className="mr-1 mb-1" />
            <h6>Pay with E-sewa</h6>
          </Button>
          <Button
            className="primary-btn w-full flex justify-center items-center"
            shape="round"
            type="primary"
          >
            <MdOutlineShoppingCartCheckout className="mr-1 mb-1" />
            <h6>Pay with Khalti</h6>
          </Button>
        </Card>
      </Drawer>
    </>
  );
};

CartDrawer.propTypes = {
  title: PropType.string.isRequired,
  open: PropType.bool,
  onClose: PropType.func,
};

export default CartDrawer;
