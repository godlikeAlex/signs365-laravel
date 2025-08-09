import { Swiper, SwiperRef, SwiperSlide, useSwiper } from "swiper/react";
import { IProductCard } from "@/src/types/models";
import ProductCard from "../ProductCard";
import classes from "./SliderProducts.module.scss";

import SliderArrow from "@/assets/icons/slider-arrow.svg?react";
import classNames from "classnames";
import { useRef } from "react";
import SwiperOriginal from "swiper";

type Props = {
  products: IProductCard[];
};

export default function SliderProducts({ products }: Props) {
  const swiperRef = useRef<SwiperOriginal>();

  return (
    <div className={classes.sliderProductsContainer}>
      <Swiper
        className={classes.sliderProducts}
        onSwiper={(swipper) => (swiperRef.current = swipper)}
        breakpoints={{
          500: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
        }}
      >
        {products.slice(0, 8).map((product, idx) => (
          <SwiperSlide>
            <ProductCard {...product} key={`${product.id}-${idx}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={classes.sliderProductsNav}>
        <button
          onClick={() => swiperRef.current.slidePrev()}
          className={classes.sliderProductsArrowBtn}
        >
          <SliderArrow
            className={classNames(
              classes.sliderProductsArrow,
              classes.sliderProductsArrowPrev
            )}
          />
        </button>

        <button
          onClick={() => swiperRef.current.slideNext()}
          className={classNames(
            classes.sliderProductsNext,
            classes.sliderProductsArrowBtn
          )}
        >
          <SliderArrow className={classes.sliderProductsArrow} />
        </button>
      </div>
    </div>
  );
}
