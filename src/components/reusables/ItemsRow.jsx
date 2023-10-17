import PropTypes from "prop-types";
import Slider from "react-slick";
import ItemCard from "./ItemCard";

//  item slider style
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ItemsRow({ sectionTitle, items }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
  };
  return (
    <>
      <h2 className="text-xl mb-4">{sectionTitle}</h2>
      <Slider {...settings}>
        {items.map(
          ({
            id,
            title,
            price,
            previousPrice,
            colors,
            image,
            isNew,
            isHot,
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
          )
        )}
      </Slider>
    </>
  );
}

ItemsRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array.isRequired,
  sectionTitle: PropTypes.string.isRequired,
};

export default ItemsRow;
