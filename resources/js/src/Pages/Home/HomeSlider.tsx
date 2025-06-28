import React from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import footerBg from "@/assets/images/footer-bg.webp";
import slide3Bg from "@/assets/images/slides/slide3-bg.webp";
import slide1 from "@/assets/images/slides/slide1.webp";
import slide2 from "@/assets/images/slides/slide2.webp";
import slide3 from "@/assets/images/slides/slide3.webp";
import slide2PriceStar from "@/assets/images/slides/price.webp";

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
      className="home-swiper"
    >
      <SwiperSlide>
        <div
          className="ps-banner ps-banner--bottom"
          style={{ background: `url(${footerBg})` }}
        >
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
          </div>
          <img className="slide-image" src={slide1} alt="BUSINESS CARDS" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="ps-banner" style={{ background: `url(${footerBg})` }}>
          <div className="container">
            <div className="banner-row">
              <h3 className="banner-highlight banner-highlight--big banner-highlight--purple">
                GET NOTICED!
                <img
                  className="banner-highlight__price"
                  src={slide2PriceStar}
                />
              </h3>

              <h3
                style={{ marginTop: 20 }}
                className="banner-highlight banner-highlight--big banner-highlight--medium banner-highlight--purple"
              >
                3' x 8' BANNERS
              </h3>

              <div style={{ marginTop: 25 }} className="banner-description">
                <h5>Only $80! Perfect for events,</h5>
                <h5>promotions and more.</h5>
              </div>
            </div>
          </div>
          <img className="slide-image" src={slide2} alt="3' x 8' BANNERS" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="ps-banner" style={{ background: `url(${slide3Bg})` }}>
          <div className="container">
            <div className="banner-row">
              <h3 className="banner-highlight banner-highlight--big">
                FREE SHIPPING
              </h3>

              <h3
                className="banner-highlight banner-highlight--big"
                style={{ marginTop: 20 }}
              >
                ALL ORDERS!
              </h3>

              <div style={{ marginTop: 25 }} className="banner-description">
                <h5>No minimum purchase required</h5>
              </div>
            </div>
          </div>
          <img className="slide-image" src={slide3} alt="FREE SHIPPING" />
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
