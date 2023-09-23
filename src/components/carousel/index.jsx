import { useCallback, useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from 'antd';
import { BiSolidRightArrow, BiSolidLeftArrow } from 'react-icons/bi';
import '@/scss/carousel.scss';

//  static slider from now
const slides = [
  {
    index: 1,
    slide_img: '/assets/sliders/slide1.jpg',
    content: null,
  },
  {
    index: 2,
    slide_img: '/assets/sliders/slide2.jpg',
    content: null,
  },
  {
    index: 3,
    slide_img: '/assets/sliders/slide1.jpg',
    content: null,
  },
];

function Carousels() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onInit = useCallback((embApi) => {
    setScrollSnaps(embApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((embApi) => {
    setSelectedIndex(embApi.selectedScrollSnap());
    setPrevBtnDisabled(!embApi.canScrollPrev());
    setNextBtnDisabled(!embApi.canScrollNext());
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
    <>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((slide) => (
              <div className="embla__slide" key={slide.index}>
                <img
                  className="embla__slide__img"
                  src={slide.slide_img}
                  alt="Your alt text"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="embla__buttons absolute">
          <Button
            onClick={scrollPrev}
            className="cursor-pointer bg-white ml-4"
            disabled={prevBtnDisabled}
            shape="circle"
            size="large"
          >
            <BiSolidLeftArrow size={18} className="mx-auto" />
          </Button>

          <Button
            onClick={scrollNext}
            className="cursor-pointer bg-white mr-4"
            disabled={nextBtnDisabled}
            shape="circle"
            size="large"
          >
            <BiSolidRightArrow size={18} className="mx-auto" />
          </Button>
        </div>
      </div>

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <Button
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            onClick={() => scrollTo(index)}
            type="link"
            className={`embla__dot  ${
              index === selectedIndex ? 'embla__dot--selected' : ''
            }`}
          />
        ))}
      </div>
    </>
  );
}

export default Carousels;
