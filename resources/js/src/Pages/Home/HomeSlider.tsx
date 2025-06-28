import React, { useRef } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import footerBg from "@/assets/images/footer-bg.webp";
import slide3Bg from "@/assets/images/slides/slide3-bg.webp";
import slide4Bg from "@/assets/images/slides/slide4-bg.png";
import slide1 from "@/assets/images/slides/slide1.webp";
import slide2 from "@/assets/images/slides/slide2.png";
import slide3 from "@/assets/images/slides/slide3.png";
import slide4 from "@/assets/images/slides/slide4.png";
import slide5 from "@/assets/images/slides/slide5.png";
import slide2PriceStar from "@/assets/images/slides/price.webp";
import SVGLogo from "@/assets/images/logo.svg?react";

import truckIcon from "@/assets/icons/slider/truck.svg";
import rewardIcon from "@/assets/icons/slider/reward.svg";

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
        <div className="ps-banner" style={{ background: `url(${slide4Bg})` }}>
          <div className="container">
            <div className="banner-row">
              <SVGLogo style={{ width: 90, height: "auto" }} />

              <h3
                className="banner-highlight banner-highlight--medium"
                style={{ marginTop: 50 }}
              >
                YOUR OUTDOOR
              </h3>

              <h3 className="banner-highlight banner-highlight--medium">
                ADVERTISING EXPERTS
              </h3>

              <div style={{ marginTop: 50 }} className="banner-group">
                <h3 className="banner-highlight banner-highlight--medium banner-highlight--medium-compact banner-highlight--pink">
                  <img className="banner-highlight__icon" src={truckIcon} />{" "}
                  Free shipping
                </h3>

                <h3 className="banner-highlight banner-highlight--medium banner-highlight--medium-compact banner-highlight--pink">
                  <img className="banner-highlight__icon" src={rewardIcon} />
                  Certified products
                </h3>
              </div>
            </div>

            <img className="slide-image" src={slide4} alt="BUSINESS CARDS" />
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="ps-banner" style={{ background: `url(${footerBg})` }}>
          <div className="container">
            <div className="banner-row">
              <h3 className="banner-highlight banner-highlight--big">
                SAVE 10%
              </h3>

              <h3
                className="banner-highlight banner-highlight--big"
                style={{ marginTop: 20 }}
              >
                on Your First Order!
              </h3>

              <div style={{ marginTop: 25 }} className="banner-description">
                <h5>Start your shopping journey with</h5>
                <h5>an exclusive 10% discount.</h5>
                <h5>Use code FIRST10 at checkout.</h5>
              </div>
            </div>

            <img className="slide-image" src={slide5} alt="BUSINESS CARDS" />
          </div>
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

            <img className="slide-image" src={slide3} alt="BUSINESS CARDS" />
          </div>
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

            <img className="slide-image" src={slide2} alt="BUSINESS CARDS" />
          </div>
        </div>
      </SwiperSlide>

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

            <img className="slide-image" src={slide1} alt="BUSINESS CARDS" />
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
