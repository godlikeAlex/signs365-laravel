import React, { useState } from "react";
import Slider from "react-slick";
import "./style.css";
import { ProductImage } from "@/src/types/ProductModel";
import { NextArrow, PrevArrow } from "./Arrows";

interface Props {
  images: ProductImage[];
  productName: string;
}

const ThumbnailSlick = {
  // slidesToShow: 5,
  slidesToScroll: 1,
  lazyLoad: "ondemand",
  dots: false,
  arrows: false,
  focusOnSelect: true,
  infinite: false,
};

const MainSlick = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  dots: false,
  lazyLoad: "ondemand",
};

const ProductSlider: React.FC<Props> = ({ images, productName }: Props) => {
  const [mainSlickRef, setMainSlickRef] = useState(null);
  const [thumbNailSlickRef, setThumbNailSlickRef] = useState(null);

  return (
    <div
      className="ps-product--gallery"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="sticky-sliders">
        {/* <div className="sticky-sliders"> */}
        <Slider
          ref={(slider) => setMainSlickRef(slider)}
          asNavFor={thumbNailSlickRef}
          {...MainSlick}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
          className="ps-product__thumbnail"
        >
          {images.map((img) => (
            <div className="slide" key={`main-${img.id}`}>
              <div
                style={{
                  paddingBottom: "100%",
                  background: "#EEE",
                  height: 0,
                  position: "relative",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    position: "absolute",
                  }}
                  src={`/storage/${img.path}`}
                  alt={img.alt ? img.alt : productName}
                />
              </div>
            </div>
          ))}
        </Slider>
        <Slider
          ref={(slider) => setThumbNailSlickRef(slider)}
          asNavFor={mainSlickRef}
          {...ThumbnailSlick}
          slidesToShow={5}
          className="ps-gallery--image"
          style={{ display: "block" }}
        >
          {images.map((img) => (
            <div className="slide" key={`thumb-${img.id}`}>
              <div className="ps-gallery__item">
                <img
                  src={`/storage/${img.path}`}
                  alt={img.alt ? img.alt : productName}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlider;
