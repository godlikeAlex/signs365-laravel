import React, { useState } from "react";
import Slider from "react-slick";
import "./style.css";
import { ProductImage } from "@/src/types/ProductModel";
import { NextArrow, PrevArrow } from "./Arrows";
import placeholderImagePath from "@/assets/images/placeholder.webp";
import VideoSlide from "./VideoSlide";
import VideoThumbnail from "./VideoThumbnail";

interface Props {
  images: ProductImage[];
  video: { path: string; cover: string } | null;
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

const ProductSlider: React.FC<Props> = ({
  images,
  productName,
  video,
}: Props) => {
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
          {images.length > 0 ? (
            images.map((img) => {
              return (
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
              );
            })
          ) : (
            <div className="slide">
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
                  src={placeholderImagePath}
                />
              </div>
            </div>
          )}

          {video && (
            <div className="slide">
              <div
                style={{
                  paddingBottom: "100%",
                  background: "#EEE",
                  height: 0,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    position: "absolute",
                  }}
                >
                  <VideoSlide
                    poster={`/storage/${video.cover}`}
                    path={`/storage/${video.path}`}
                  />
                </div>
              </div>
            </div>
          )}
        </Slider>
        <Slider
          ref={(slider) => setThumbNailSlickRef(slider)}
          asNavFor={mainSlickRef}
          {...ThumbnailSlick}
          slidesToShow={4}
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

          {video && (
            <div className="slide">
              <div className="ps-gallery__item">
                <VideoThumbnail videoUrl={`/storage/${video.cover}`} />
              </div>
            </div>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlider;
