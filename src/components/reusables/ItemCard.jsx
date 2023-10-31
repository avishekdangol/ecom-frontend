import { Card, Badge, Button } from 'antd';
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import PropTypes from 'prop-types';
import '@/scss/common.scss';

function ItemCard({
  title, price, previousPrice, image, colors, isNew, isHot, isWishlisted,
}) {
  return (
    <Card
      className="item-card shadow-md relative bg-gray-100"
      cover={<img src={image} alt="" />}
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

      {/* Wishlist Button */}
      <Button type="link" className="absolute top-2 left-0">
        {
          isWishlisted ? (
            <AiFillHeart size={24} className="text-red-400 hover:text-red-600" />
          ) : (
            <AiOutlineHeart size={24} className="text-red-400 hover:text-red-600" />
          )
        }
      </Button>

      {/* Item Details */}
      <h4>{title}</h4>
      <p className="text-orange-700">
        $
        {price}
        &nbsp;&nbsp;&nbsp;
        {previousPrice ? (
          <span className="line-through text-black">
            $
            {previousPrice}
          </span>
        )
          : ''}
      </p>

      <div className="flex justify-between items-center mt-3 mb-5">
        <Badge className="bg-sky-200 p-1 rounded-md text-[12px] text-teal-900">Colors</Badge>
        <div className="flex">
          {
            colors.map((color, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`${color}-${index}`}
                className={`h-[15px] w-[15px] rounded-full ${color} border-2 mx-1`}
              />
            ))
          }
        </div>
      </div>

      <Button
        className="primary-btn w-full flex justify-center items-center"
        shape="round"
        type="primary"
      >
        <AiOutlineShoppingCart className="mr-1 mb-1" />
        <h6>Add to cart</h6>
      </Button>
    </Card>
  );
}

ItemCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  previousPrice: PropTypes.number,
  image: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  colors: PropTypes.array.isRequired,
  isNew: PropTypes.bool,
  isHot: PropTypes.bool,
  isWishlisted: PropTypes.bool,
};

ItemCard.defaultProps = {
  previousPrice: null,
  isNew: false,
  isHot: false,
  isWishlisted: false,
};

export default ItemCard;
