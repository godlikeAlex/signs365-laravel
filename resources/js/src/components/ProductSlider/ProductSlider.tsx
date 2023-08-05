import React, { useState } from "react";
import Slider from "react-slick";
import "./style.css";

interface Props {
  images: string[];
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
  arrows: false,
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
        <Slider
          ref={(slider) => setMainSlickRef(slider)}
          asNavFor={thumbNailSlickRef}
          {...MainSlick}
          className="ps-product__thumbnail"
        >
          {images.map((img) => (
            <div className="slide" key={`main-${img}`}>
              <img src={`/storage/${img}`} alt={productName} />
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
            <div className="slide" key={`thumb-${img}`}>
              <div className="ps-gallery__item">
                <img src={`/storage/${img}`} alt={productName} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlider;
