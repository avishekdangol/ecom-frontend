import { useCallback, useState, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "antd";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import "@/scss/carousel.scss";

//  static slider from now
const slides = [
  {
    index: 1,
    slide_img: "/assets/sliders/slide1.jpg",
    content: null,
  },
  {
    index: 2,
    slide_img: "/assets/sliders/slide2.jpg",
    content: null,
  },
  {
    index: 3,
    slide_img: "/assets/sliders/slide1.jpg",
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
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((embApi) => {
    setScrollSnaps(embApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((embApi) => {
    setSelectedIndex(embApi.selectedScrollSnap());
    setPrevBtnDisabled(!embApi.canScrollPrev());
    setNextBtnDisabled(!embApi.canScrollNext());
  }, []);

  const blurSliderStyle = { filter: 'grayscale(1) blur(2px)' }
  const focusSliderStyle = { filter: 'drop-shadow(2px 0 10px #b6b6b6)' }

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <section className="relative">
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((slide, index) => (
              <div className="embla__slide" style={index !== selectedIndex ? blurSliderStyle : focusSliderStyle} key={slide.index}>
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
            className="cursor-pointer bg-white"
            disabled={prevBtnDisabled}
            shape="circle"
            size="large"
            onClick={scrollPrev}
          >
            <BiSolidLeftArrow size={18} className="mx-auto" />
          </Button>

          <Button
            className="cursor-pointer bg-white"
            disabled={nextBtnDisabled}
            shape="circle"
            size="large"
            onClick={scrollNext}
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
            type="link"
            className={`embla__dot  ${
              index === selectedIndex ? "embla__dot--selected" : ""
            }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default Carousels;
