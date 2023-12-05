import PropTypes from "prop-types";

import { Card, Badge, InputNumber, Button } from "antd";

const ProductCart = ({
  title,
  price,
  previousPrice,
  colors,
  image,
  isHot,
  isNew,
}) => {
  return (
    <>
      <Card
        style={{
          marginTop: "2px",
        }}
      >

         {/* Tags */}
      <div className="absolute top-0 right-0">
        {
          isNew ? (
            <Badge.Ribbon text="NEW" className="text-[10px]" />
          ) : ''
        }
        {
          isHot ? (
            <Badge.Ribbon text="HOT" className={`text-[10px] bg-orange-600 ${isNew ? 'mt-8' : ''}`} />
          ) : ''
        }
      </div>

        <section className="flex gap-2">
          <div className="w-5/12">
            <img src={image} alt="" className="" />
          </div>
          <div className="flex flex-col">
            <h4>{title}</h4>

            <p className="text-orange-700">
              ${price}
              &nbsp;&nbsp;&nbsp;
              {previousPrice ? (
                <span className="line-through text-black">
                  ${previousPrice}
                </span>
              ) : (
                ""
              )}
            </p>

            {/* colors */}
            <div className="flex justify-between items-center mt-3 mb-5">
              <Badge className="bg-sky-200 p-1 rounded-md text-[12px] text-teal-900">
                Colors
              </Badge>
              <div className="flex">
                {colors.map((color, index) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${color}-${index}`}
                    className={`h-[15px] w-[15px] rounded-full ${color} border-2 mx-1`}
                  />
                ))}
              </div>
            </div>

             <div>
                <Button type="link text-xs">Remove</Button>
                <InputNumber min={1}  defaultValue={1} className="h-7 w-12" />
             </div>
          </div>
        </section>
      </Card>
    </>
  );
};

ProductCart.propTypes = {
  title: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  previousPrice: PropTypes.oneOfType[PropTypes.string, PropTypes.number, PropTypes.func],
  colors: PropTypes.PropTypes.oneOfType(PropTypes.arrayOf[PropTypes.string], PropTypes.func),
  image: PropTypes.string,
  isHot: PropTypes.bool,
  isNew: PropTypes.bool,
};

export default ProductCart;
