import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

import "./style.css";
import { Outlet, Path, useLocation, useNavigate } from "react-router-dom";
import { IProduct, IProductVaraint } from "@/src/types/models";
import { VariantsProductPlaceholder } from "@/src/components";
import ProductService from "@/src/services/ProductService";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/src/hooks";
import { addToCart } from "@/src/redux/cartSlice";
import Slider from "react-slick";

interface Props {}

interface ILocation extends Path {
  state: {
    product: IProduct;
  };
}

interface IState {
  loading: boolean;
  productVaraintsLoaded: boolean;
  productVariants?: IProductVaraint[];
  currentVaraint?: IProductVaraint;
  product?: IProduct;
}

const ThumbnailSlick = {
  slidesToShow: 5,
  slidesToScroll: 1,
  lazyLoad: "ondemand",
  asNavFor: ".ps-product--gallery .ps-product__thumbnail",
  dots: false,
  arrows: false,
  focusOnSelect: true,
};

const ModalShowProduct: React.FC<Props> = ({}: Props) => {
  const location: ILocation = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [state, setState] = useState<IState>({
    loading: location.state?.product ? true : false,
    productVariants: undefined,
    productVaraintsLoaded: false,
    currentVaraint: undefined,
    product: undefined,
  });

  useEffect(() => {
    if (!location.state?.product) {
      // need fetch PRODUCT if joined by link
    }
  }, [location]);

  useEffect(() => {
    const fetchVariants = async () => {
      const { data } = await ProductService.getProductVariants(product.id);

      if (data.variants.length > 0) {
        setState((currentState) => ({
          ...currentState,
          productVaraintsLoaded: true,
          productVariants: data.variants,
          currentVaraint: data.variants[0],
        }));
      } else {
        toast("Variants not found, try reload page", { type: "warning" });
      }
    };

    if (state.product) {
      fetchVariants();
    }
  }, [state.product]);

  const handleSelectVariant = (productVariant: IProductVaraint) => {
    setState((currentState) => ({
      ...currentState,
      currentVaraint: productVariant,
    }));
  };

  const handleAddToCart = async () => {
    dispatch(
      addToCart({
        product_id: state.product.id,
        product_variant_id: state.currentVaraint.id,
      })
    );
    toast("Successfully added to cart", { type: "success" });
  };

  return (
    <>
      <Dialog open onClose={() => navigate(-1)}>
        <div className="headless-bg">
          <Dialog.Panel className="headless-popup">
            <div className="modal-body">
              <div className="wrap-modal-slider container-fluid ps-quickview__body">
                <button
                  className="close ps-quickview__close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="ps-product--detail">
                  <div className="row">
                    <div className="col-12 col-xl-6">
                      <div className="ps-product--gallery">
                        <div className="ps-product__thumbnail">
                          <div className="slide">
                            <img src="/img/products/001.jpg" alt="alt" />
                          </div>
                          <div className="slide">
                            <img src="/img/products/047.jpg" alt="alt" />
                          </div>
                          <div className="slide">
                            <img src="/img/products/047.jpg" alt="alt" />
                          </div>
                          <div className="slide">
                            <img src="/img/products/008.jpg" alt="alt" />
                          </div>
                          <div className="slide">
                            <img src="/img/products/034.jpg" alt="alt" />
                          </div>
                        </div>
                        <Slider
                          {...ThumbnailSlick}
                          className="ps-gallery--image"
                        >
                          <div className="slide">
                            <div className="ps-gallery__item">
                              <img src="/img/products/001.jpg" alt="alt" />
                            </div>
                          </div>
                          <div className="slide">
                            <div className="ps-gallery__item">
                              <img src="/img/products/047.jpg" alt="alt" />
                            </div>
                          </div>
                          <div className="slide">
                            <div className="ps-gallery__item">
                              <img src="/img/products/047.jpg" alt="alt" />
                            </div>
                          </div>
                          <div className="slide">
                            <div className="ps-gallery__item">
                              <img src="/img/products/008.jpg" alt="alt" />
                            </div>
                          </div>
                          <div className="slide">
                            <div className="ps-gallery__item">
                              <img src="/img/products/034.jpg" alt="alt" />
                            </div>
                          </div>
                        </Slider>
                      </div>
                    </div>
                    <div className="col-12 col-xl-6">
                      <div className="ps-product__info">
                        <div className="ps-product__badge">
                          <span className="ps-badge ps-badge--instock">
                            {" "}
                            IN STOCK
                          </span>
                        </div>
                        <div className="ps-product__branch">
                          <a href="#">HeartRate</a>
                        </div>
                        <div className="ps-product__title">
                          <a href="#">Blood Pressure Monitor</a>
                        </div>

                        <div className="ps-product__desc">
                          <ul className="ps-product__list">
                            <li>Study history up to 30 days</li>
                            <li>Up to 5 users simultaneously</li>
                            <li>Has HEALTH certificate</li>
                          </ul>
                        </div>
                        <div className="ps-product__meta">
                          <span className="ps-product__price">$77.65</span>
                        </div>
                        <div className="ps-product__quantity">
                          <h6>Quantity</h6>
                          <div className="d-md-flex align-items-center">
                            <div className="def-number-input number-input safari_only">
                              <button className="minus">
                                <i className="icon-minus"></i>
                              </button>
                              <input
                                className="quantity"
                                min="0"
                                name="quantity"
                                value="1"
                                type="number"
                              />
                              <button className="plus">
                                <i className="icon-plus"></i>
                              </button>
                            </div>
                            <a
                              className="ps-btn ps-btn--warning"
                              href="#"
                              data-toggle="modal"
                              data-target="#popupAddcartV2"
                            >
                              Add to cart
                            </a>
                          </div>
                        </div>
                        <div className="ps-product__type">
                          <ul className="ps-product__list">
                            <li>
                              {" "}
                              <span className="ps-list__title">Tags: </span>
                              <a className="ps-list__text" href="#">
                                Health
                              </a>
                              <a className="ps-list__text" href="#">
                                Thermometer
                              </a>
                            </li>
                            <li>
                              {" "}
                              <span className="ps-list__title">SKU: </span>
                              <a className="ps-list__text" href="#">
                                SF-006
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="images-headless"></div>

            <div className="headless-content">
              <Dialog.Title className={"product_modal_title"}>
                {product.title}
              </Dialog.Title>
              {state.productVaraintsLoaded && state.currentVaraint ? (
                <div className="product_modal_price">
                  {state.currentVaraint.price.toLocaleString()} $
                </div>
              ) : (
                <div>Loading...</div>
              )}
              <Dialog.Description
                className={"product_modal_desc"}
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></Dialog.Description>
              <h3>Variants</h3>
              {state.productVaraintsLoaded ? (
                <div className="product-variants-container">
                  {state.productVariants.map((productVariant) => (
                    <div
                      className={
                        productVariant.id === state.currentVaraint.id
                          ? "product-variant active"
                          : "product-variant"
                      }
                      onClick={() => handleSelectVariant(productVariant)}
                    >
                      <h5>{productVariant.label}</h5>
                      <h6>{productVariant.price.toLocaleString()} $</h6>
                    </div>
                  ))}
                </div>
              ) : (
                <VariantsProductPlaceholder />
              )}

              <div className="add-to-cart" onClick={handleAddToCart}>
                Add to cart
              </div>
            </div> */}

            {/* <p dangerouslySetInnerHTML={{ __html: product.description }}></p> */}

            {/* <button onClick={() => setIsOpen(false)}>Deactivate</button> */}
            {/* <button onClick={() => setIsOpen(false)}>Cancel</button> */}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default ModalShowProduct;
