import PropTypes from 'prop-types';
import ItemCard from './ItemCard';
import Carousel from '../carousel';

function ItemsRow({ sectionTitle, items, carousel }) {
  return (
    <>
      <h2 className="text-xl mb-4">{sectionTitle}</h2>
      {
        carousel
          ? (
            <Carousel
              slides={items.map(({
                id, title, price, previousPrice, colors, image, isNew, isHot, isWishlisted
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
                  isWishlisted={isWishlisted} 
                />
              ))}
              slidesType="component"
              autoPlay={false}
              loop={false}
              dotsOffset={-42}
            />
          )
          : (
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
          )
      }
    </>
  );
}

ItemsRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array.isRequired,
  sectionTitle: PropTypes.string.isRequired,
  carousel: PropTypes.bool,
};

ItemsRow.defaultProps = {
  carousel: false,
};

export default ItemsRow;
