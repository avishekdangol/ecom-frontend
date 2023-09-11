import PropTypes from 'prop-types';
import ItemCard from './ItemCard';

function ItemsRow({ items }) {
  return (
    <div className="flex justify-between mx-20">
      {
        items.map(({
          title, price, previousPrice, colors, image, isNew, isHot,
        }) => (
          <ItemCard
            title={title}
            price={price}
            previousPrice={previousPrice}
            colors={colors}
            image={image}
            isNew={isNew}
            isHot={isHot}
          />
        ))
      }
    </div>
  );
}

ItemsRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array.isRequired,
};

export default ItemsRow;
