import PropTypes from "prop-types";

import { Drawer, Divider, Card, Button, Empty } from "antd";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

import ProductCart from "./product";

// const items = new Array(2).fill().map((arr, index) => ({
//   id: index,
//   title: "Nike Air",
//   price: 180.0,
//   previousPrice: 249.0,
//   colors:
//     index % 3
//       ? ["bg-[#fff]", "bg-[#df6e44]", "bg-[#000]"]
//       : ["bg-[#000]", "bg-[#ae64f0]"],
//   image:
//     "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e9d41cd4-a2c5-4ca7-a3aa-f4bf597658d0/custom-nike-air-force-1-mid-by-you-shoes.png",
//   isNew: !!(index % 2),
//   isHot: !!(index % 3),
// }));

const CartDrawer = ({ title, onClose, open, products, totalAmount }) => {
  return (
    <>
      <Drawer title={title} onClose={onClose} open={open}>
        {products.length > 0 ? (
          <>
            {products.map((item) => (
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
                  qty={item.qty}
                />
              </>
            ))}
          </>
        ) : (
          <>
            <Empty
              description="Empty Cart"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </>
        )}

        <Divider />
        <Card>
          <h1 className="my-1">Total: {totalAmount}</h1>
          <Button
            className="primary-btn w-full flex justify-center items-center mb-2"
            shape="round"
            type="link"
          >
            <MdOutlineShoppingCartCheckout className="mr-1 mb-1" />
            <h6>Browser Cart</h6>
          </Button>
          <Button
            className="primary-btn w-full flex justify-center items-center mb-2"
            shape="round"
            type="primary"
          >
            <MdOutlineShoppingCartCheckout className="mr-1 mb-1" />
            <h6>Checkout</h6>
          </Button>
          {/* <Button
            className="primary-btn w-full flex justify-center items-center"
            shape="round"
            type="primary"
          >
            <MdOutlineShoppingCartCheckout className="mr-1 mb-1" />
            <h6>Pay with Khalti</h6>
          </Button> */}
        </Card>
      </Drawer>
    </>
  );
};

CartDrawer.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  products: PropTypes.arrayOf(PropTypes.object),
  totalAmount: PropTypes.number,
};

export default CartDrawer;
