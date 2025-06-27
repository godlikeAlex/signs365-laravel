import React, { useRef } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import footerBg from "@/assets/images/footer-bg.webp";
import slide1 from "@/assets/images/slides/slide1.png";

import "./HomeSlider.css";

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
      // loop
      autoplay={{
        delay: 5000,
      }}
      className="mySwiper"
    >
      <SwiperSlide>
        <div className="ps-banner" style={{ background: `url(${footerBg})` }}>
          <div className="container">
            <div className="banner-row">
              <h3 className="banner-highlight banner-highlight--big">
                BUSINESS CARD
              </h3>

              <div style={{ marginTop: 25 }} className="banner-description">
                <h5>HIGH-QUALITY PRINTING,</h5>
                <h5 className="banner-highlight">FAST TURNAROUND,</h5>
                <h5>AND AFFORDABLE PRICES.</h5>
              </div>
            </div>

            <img
              className="slide-image"
              src={slide1}
              alt="BUSINESS CARDS"
              style={{
                position: "absolute",
                /* top: 0; */
                height: "90%",
                bottom: 0,
                right: "100px",
              }}
            />
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
        <i className="fa-solid fa-chevron-left"></i>
      </div>

      <div
        onClick={() => swiper.slideNext()}
        className="slide-next-swiper swipper-arrow"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </div>
  );
};

export default HomeSlider;
