import { useCallback, useState, useEffect } from "react";
// import PropTypes from "prop-types";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { slide1, slide2 } from "../../images/js/image";
// import {  } from "@ant-design/icons";
import "../../scss/carousel.scss";

//  static slider from now
const slides = [
  {
    index: 1,
    slide_img: slide1,
    content: null,
  },
  {
    index: 2,
    slide_img: slide2,
    content: null,
  },
  {
    index: 3,
    slide_img: slide1,
    content: null,
  },
];

function Carousels() {
  const [emblaRef, emblaApi] = useEmblaCarousel({});
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

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
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
            className="cursor-pointer bg-white"
            disabled={prevBtnDisabled}
            shape="circle"
          >
            <CaretLeftOutlined />
          </Button>

          <Button
            onClick={scrollNext}
            className="cursor-pointer bg-white"
            disabled={nextBtnDisabled}
            shape="circle"
          >
            <CaretRightOutlined />
          </Button>
        </div>
      </div>

      <div className="image_pagination flex gap-2">
        {slides.map((slide) => (
          <img
            key={slide.index}
            src={slide.slide_img}
            onClick={() => scrollTo(slide.index - 1)}
          />
        ))}
      </div>

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <div
            key={index}
            onClick={() => scrollTo(index)}
            className={`embla__dot  ${
              index == selectedIndex ? "embla__dot--selected" : ""
            }`}
          ></div>
        ))}
      </div>
    </>
  );
}

export default Carousels;
