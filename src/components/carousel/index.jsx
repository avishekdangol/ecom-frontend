import { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from 'antd';
import '@/scss/carousel.scss';

const autoplayOptions = {
  stopOnMouseEnter: true,
  stopOnInteraction: false,
};

function Carousel({
  slides, itemsPerSlide, slidesType, dotsOffset, autoPlay, loop,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop }, autoPlay ? [Autoplay(autoplayOptions)] : []);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onInit = useCallback((embApi) => {
    setScrollSnaps(embApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((embApi) => {
    setSelectedIndex(embApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <section className="relative">
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((slide) => (
              slidesType === 'image' ? (
                <div
                  className="embla__slide"
                  key={slide.id}
                  style={{ flex: `0 0 ${100 / itemsPerSlide}%` }}
                >
                  <img
                    className="embla__slide__img"
                    src={slide.image}
                    alt="Your alt text"
                  />
                </div>
              ) : (
                <div
                  key={slide.key}
                  className="mx-3"
                >
                  {slide}
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      <div className="embla__dots" style={{ bottom: `${dotsOffset}px` }}>
        {scrollSnaps.map((_, index) => (
          <Button
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            type="link"
            className={`px-1 embla__dot  ${
              index === selectedIndex ? 'embla__dot--selected' : ''
            }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
}

Carousel.propTypes = {
  itemsPerSlide: PropTypes.number,
  slidesType: PropTypes.string,
  slides: PropTypes.arrayOf(PropTypes.shape({
    id: Number,
    image: String,
    content: String,
  })).isRequired,
  dotsOffset: PropTypes.number,
  autoPlay: PropTypes.bool,
  loop: PropTypes.bool,
};

Carousel.defaultProps = {
  itemsPerSlide: 1,
  slidesType: 'image',
  dotsOffset: 0,
  autoPlay: true,
  loop: true,
};

export default Carousel;
