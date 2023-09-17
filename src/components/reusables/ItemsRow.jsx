import PropTypes from 'prop-types';
import ItemCard from './ItemCard';

function ItemsRow({ sectionTitle, items }) {
  return (
    <>
      <h2 className="text-xl mb-4">{sectionTitle}</h2>
      <div className="flex justify-between">
        {
        items.map(({
          id, title, price, previousPrice, colors, image, isNew, isHot,
        }) => (
          <ItemCard
            key={`${sectionTitle}-${id}`}
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
    </>
  );
}

ItemsRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array.isRequired,
  sectionTitle: PropTypes.string.isRequired,
};

export default ItemsRow;
