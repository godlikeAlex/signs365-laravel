import { IProduct } from "@/src/types/models";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import ModalContentWithForm from "./ModalContentWithForm";
import Slider from "react-slick";
import { MainSlick, ThumbnailSlick } from "./sliderConfig";

interface Props {
  handleClose: () => void;
  product: IProduct;
  renderVariants: () => JSX.Element;
  handleAddToCart: () => void;
}

const FullModalProduct: React.FC<Props> = ({
  handleClose,
  product,
  renderVariants,
  handleAddToCart,
}: Props) => {
  const [mainSlickRef, setMainSlickRef] = useState(null);
  const [thumbNailSlickRef, setThumbNailSlickRef] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="modal-body">
      <div className="wrap-modal-slider ps-quickview__body">
        <button
          className="close ps-quickview__close"
          type="button"
          onClick={handleClose}
          style={{ cursor: "pointer", zIndex: 2 }}
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="ps-product--detail">
          <div className="container">
            <div className="row">
              <div className="col-12 col-xl-6">
                <div
                  className="ps-product--gallery"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Slider
                    ref={(slider) => setMainSlickRef(slider)}
                    asNavFor={thumbNailSlickRef}
                    {...MainSlick}
                    className="ps-product__thumbnail"
                  >
                    {product?.images.map((img) => (
                      <div className="slide">
                        <img src={`/storage/${img}`} alt={product.title} />
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
                    {product?.images.map((img) => (
                      <div className="slide">
                        <div className="ps-gallery__item">
                          <img src={`/storage/${img}`} alt={product.title} />
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              <div className="col-12 col-xl-6">
                <div
                  className="ps-product__info row no-gutters"
                  style={{ marginTop: 20, marginBottom: 20 }}
                >
                  <div className="ps-product__branch col-md-12">
                    {product?.categories?.map((category) => (
                      <a>{category.title}</a>
                    )) || <Skeleton />}
                  </div>
                  <div className={"ps-product__title col-md-12"}>
                    <a>{product?.title || <Skeleton />}</a>
                  </div>

                  <div className="ps-product__desc col-md-12">
                    {product?.description ? (
                      <div
                        className={"product_modal_desc"}
                        dangerouslySetInnerHTML={{
                          __html: product?.description,
                        }}
                      ></div>
                    ) : (
                      <Skeleton count={4} />
                    )}
                  </div>

                  <div
                    className="ps-product__meta col-md-12"
                    style={{ marginTop: 0 }}
                  >
                    {product?.with_checkout ? (
                      renderVariants()
                    ) : (
                      <ModalContentWithForm product={product} />
                    )}
                  </div>

                  {product?.with_checkout ? (
                    <button
                      type="submit"
                      style={{ marginTop: 20 }}
                      className="ps-btn ps-btn--warning btn-add-to-cart-modal"
                      onClick={handleAddToCart}
                    >
                      Add to cart
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullModalProduct;
