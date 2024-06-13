import React, { useRef } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface HomeSliderProps {}

const HomeSlider: React.FC<HomeSliderProps> = ({}: HomeSliderProps) => {
  return (
    <Swiper
      modules={[Autoplay]}
      loop
      autoplay={{
        delay: 5000,
      }}
      className="mySwiper"
    >
      {/* <SwiperSlide>
        <div className="ps-banner" style={{ background: "#FFCC00" }}>
          <div className="container container-initial">
            <div className="ps-banner__block">
              <div className="ps-banner__content">
                <h2 className="ps-banner__title">
                  Buy banner now <br />
                  free shipping
                </h2>
                <div className="ps-banner__desc">55% off only in NY</div>

                <a className="bg-white ps-banner__shop" href="#">
                  Shop now
                </a>
                <div className="ps-banner__persen bg-primary">-25%</div>
              </div>
              <div className="ps-banner__thumnail">
                <img
                  className="ps-banner__round"
                  src="/img/round2.png"
                  alt="alt"
                />
                <img
                  className="ps-banner__image"
                  src="/img/promotion/slide4.png"
                  alt="alt"
                />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide> */}
      <SwiperSlide>
        <div className="ps-banner" style={{ background: "#F0F2F5" }}>
          <div className="container container-initial">
            <div className="ps-banner__block">
              <div className="ps-banner__content">
                <h2 className="ps-banner__title">10% OFF FOR FIRST ORDER</h2>
                <div className="ps-banner__desc">Only this week</div>

                <div className="ps-banner__persen bg-yellow ps-top">
                  <small>only</small>$25
                </div>
              </div>
              <div className="ps-banner__thumnail">
                <img
                  className="ps-banner__round"
                  src="/img/round5.png"
                  alt="alt"
                />
                <img
                  className="ps-banner__image"
                  src="/img/promotion/slide3.webp"
                  alt="alt"
                />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="ps-banner" style={{ background: "#DAECFA" }}>
          <div className="container container-initial">
            <div className="ps-banner__block">
              <div className="ps-banner__content">
                <h2 className="ps-banner__title">
                  Banner <br /> all types
                </h2>
                <div className="ps-banner__desc">
                  Only in this week. Don’t misss!
                </div>
                <div className="ps-banner__price">
                  {" "}
                  <span>$15.99</span>
                  <del>$29.99</del>
                </div>
                <a className="bg-warning ps-banner__shop" href="#">
                  Shop now
                </a>
                <div className="ps-banner__persen bg-warning ps-center">
                  -30%
                </div>
              </div>
              <div className="ps-banner__thumnail">
                <img
                  className="ps-banner__round"
                  src="/img/round2.png"
                  alt="alt"
                />
                <img
                  className="ps-banner__image"
                  src="/img/promotion/slide1.webp"
                  alt="alt"
                />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperNavigation />
    </Swiper>
  );
};

const SwiperNavigation = () => {
  const swiper = useSwiper();

  return (
    <div className="swipper-nav">
      <div
        onClick={() => swiper.slidePrev()}
        className="slide-prev-swiper swipper-arrow"
      >
        <i className="fa fa-chevron-left" />
      </div>

      <div
        onClick={() => swiper.slideNext()}
        className="slide-next-swiper swipper-arrow"
      >
        <i className="fa fa-chevron-right" />
      </div>
    </div>
  );
};

export default HomeSlider;
