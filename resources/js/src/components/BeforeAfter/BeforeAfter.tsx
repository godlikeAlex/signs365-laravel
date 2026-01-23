import { ImgComparisonSlider } from "@img-comparison-slider/react";

import classes from "./BeforeAfter.module.scss";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import classNames from "classnames";
import { useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { HomePageSection } from "../HomePageSection";

const beforeAfterImages = [
  {
    first: "/img/gallery/3-2.webp",
    second: "/img/gallery/3-1.webp",
  },
  {
    first: "/img/gallery/5-2.webp",
    second: "/img/gallery/5-1.webp",
  },
  {
    first: "/img/gallery/6-2.webp",
    second: "/img/gallery/6-1.webp",
  },
  {
    first: "/img/gallery/4-2.webp",
    second: "/img/gallery/4-1.webp",
  },
  {
    first: "/img/gallery/1-2.webp",
    second: "/img/gallery/1-1.webp",
  },
  {
    first: "/img/gallery/2-2.webp",
    second: "/img/gallery/2-1.webp",
  },

  // повтор (если нужен)
  {
    first: "/img/gallery/1-2.webp",
    second: "/img/gallery/1-1.webp",
  },
  {
    first: "/img/gallery/2-2.webp",
    second: "/img/gallery/2-1.webp",
  },
  {
    first: "/img/gallery/5-2.webp",
    second: "/img/gallery/5-1.webp",
  },
  {
    first: "/img/gallery/6-2.webp",
    second: "/img/gallery/6-1.webp",
  },
  {
    first: "/img/gallery/3-2.webp",
    second: "/img/gallery/3-1.webp",
  },
  {
    first: "/img/gallery/4-2.webp",
    second: "/img/gallery/4-1.webp",
  },
];

export default function BeforeAfter() {
  const swiperRef = useRef<SwiperType>();

  return (
    <HomePageSection altColor>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <HomePageSection.Title
              title="See the Difference We Make"
              description="From a digital design to a finished printed product. Real examples that show print quality, color accuracy, and attention to detail."
            />
          </div>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          className={classes.ourworksSwipper}
          slidesPerView={1.5}
          spaceBetween={35}
          roundLengths
          centeredSlides
          loopFillGroupWithBlank
          loop
          allowTouchMove={false}
          loopAdditionalSlides={3}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 0,
            },
            750: {
              slidesPerView: 1.5,
              spaceBetween: 0,
            },
          }}
        >
          <>
            {beforeAfterImages.map((images, index) => (
              <SwiperSlide className={classes.swiperSlide} key={index}>
                <ImgComparisonSlider
                  className={classNames(
                    classes.sliderExampleRelativeSize,
                    "rendered"
                  )}
                >
                  <img
                    slot="first"
                    alt="before"
                    width="100%"
                    src={images.first}
                  />
                  <img
                    slot="second"
                    alt="after"
                    width="100%"
                    src={images.second}
                  />

                  <svg
                    slot="handle"
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_228_33)">
                      <path
                        d="M50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50C38.8071 50 50 38.8071 50 25Z"
                        fill="white"
                      />
                      <path
                        d="M18.1047 16.12C17.9768 16 17.7209 16 17.593 16C17.4651 16 17.2093 16 17.0814 16.12C16.9535 16.24 16.8256 16.24 16.6977 16.36L8.38372 24.16C8.25581 24.28 8.1279 24.4 8.1279 24.52C8 24.64 8 24.88 8 25C8 25.12 8 25.36 8.1279 25.48C8.25581 25.6 8.25581 25.72 8.38372 25.84L16.6977 33.64C16.9535 33.88 17.3372 34 17.593 34C17.9768 34 18.2326 33.88 18.4884 33.64C18.7442 33.4 18.8721 33.04 18.8721 32.8C18.8721 32.44 18.7442 32.2 18.4884 31.96L11.0697 25L18.4884 18.04C18.6162 17.92 18.7442 17.8 18.7442 17.68C18.8721 17.56 19 17.44 19 17.32C19 17.2 19 16.96 18.8721 16.84C18.7442 16.72 18.7442 16.6 18.6162 16.48C18.4884 16.24 18.3605 16.24 18.1047 16.12Z"
                        fill="#FFCA19"
                      />
                      <path
                        d="M31.8953 33.88C32.0232 34 32.2791 34 32.407 34C32.5349 34 32.7907 34 32.9186 33.88C33.0465 33.76 33.1744 33.76 33.3023 33.64L41.6163 25.84C41.7442 25.72 41.8721 25.6 41.8721 25.48C42 25.36 42 25.12 42 25C42 24.88 42 24.64 41.8721 24.52C41.7442 24.4 41.7442 24.28 41.6163 24.16L33.3023 16.36C33.0465 16.12 32.6628 16 32.407 16C32.0232 16 31.7674 16.12 31.5116 16.36C31.2558 16.6 31.1279 16.96 31.1279 17.2C31.1279 17.56 31.2558 17.8 31.5116 18.04L38.9303 25L31.5116 31.96C31.3838 32.08 31.2558 32.2 31.2558 32.32C31.1279 32.44 31 32.56 31 32.68C31 32.8 31 33.04 31.1279 33.16C31.2558 33.28 31.2558 33.4 31.3838 33.52C31.5116 33.76 31.6395 33.76 31.8953 33.88Z"
                        fill="#FFCA19"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_228_33">
                        <rect width="50" height="50" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </ImgComparisonSlider>
              </SwiperSlide>
            ))}
          </>
        </Swiper>

        <div>
          <div
            className={classes.swiperButtonPrev}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <svg viewBox="0 0 532 532">
              <path
                fill="currentColor"
                d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
              />
            </svg>
          </div>

          <div
            className={classes.swiperButtonNext}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <svg viewBox="0 0 532 532">
              <path
                fill="currentColor"
                d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </HomePageSection>
  );
}
