import { useCallback, useState, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import useEmblaCarousel from "embla-carousel-react";
// eslint-disable-next-line import/no-extraneous-dependencies
import Autoplay from "embla-carousel-autoplay";
import { Button } from "antd";
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

const autoplayOptions = {
  stopOnMouseEnter: true,
  stopOnInteraction: false,
};

function Carousels() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay(autoplayOptions),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
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
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <section className="relative">
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
      </div>

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <Button
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            type="link"
            className={`px-1 embla__dot  ${
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
