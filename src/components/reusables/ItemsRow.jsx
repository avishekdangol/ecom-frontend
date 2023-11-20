import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { ArrowRightOutlined } from "@ant-design/icons";

import ItemCard from "./ItemCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function ItemsRow({ sectionTitle, items, link }) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <h2 className="text-xl mb-4">{sectionTitle}</h2>
      <Carousel
        autoPlay={true}
        infinite={true}
        //  showDots={true}
        autoPlaySpeed={2000}
        showDots={true}
        arrows={false}
        responsive={responsive}
      >
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
      </Carousel>
      <div className="flex justify-end mt-4">
        <Link to={link}>View More <ArrowRightOutlined /></Link>
      </div>
    </>
  );
}

ItemsRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array.isRequired,
  sectionTitle: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default ItemsRow;
