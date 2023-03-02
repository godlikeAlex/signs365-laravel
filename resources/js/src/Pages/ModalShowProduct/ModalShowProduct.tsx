import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";

import {
  matchPath,
  Outlet,
  Path,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { IProduct, IProductVaraint } from "@/src/types/models";
import { VariantsProductPlaceholder } from "@/src/components";
import ProductService from "@/src/services/ProductService";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/src/hooks";
import { addToCart } from "@/src/redux/cartSlice";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "./style.css";
import classNames from "classnames";

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
  productSlug?: string;
}

const ThumbnailSlick = {
  slidesToShow: 5,
  slidesToScroll: 1,
  lazyLoad: "ondemand",
  dots: false,
  arrows: false,
  focusOnSelect: true,
};

const MainSlick = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  lazyLoad: "ondemand",
};

const ModalShowProduct: React.FC<Props> = ({}: Props) => {
  const location: ILocation = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [mainSlickRef, setMainSlickRef] = useState(null);
  const [thumbNailSlickRef, setThumbNailSlickRef] = useState(null);

  const [state, setState] = useState<IState>({
    loading: location.state?.product ? true : false,
    productVariants: undefined,
    productVaraintsLoaded: false,
    currentVaraint: undefined,
    product: undefined,
    productSlug: undefined,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!location?.state?.product) {
        // need fetch PRODUCT if joined by link
        try {
          const { params, pattern, pathname } = matchPath(
            "/home/product/modal/:slug",
            location.pathname
          );

          const { data } = await ProductService.getProduct(params.slug);
          setState((currentState) => ({
            ...currentState,
            product: data.product,
            productSlug: data.product.slug,
            // loading: false
          }));
        } catch (error) {
          toast("Product not found", { type: "error" });
          console.log(error);
          navigate("/");
        }
      } else {
        setState((currentState) => ({
          ...currentState,
          product: location.state.product,
          productSlug: location.state.product.slug,
        }));
      }
    };

    fetchProduct();
  }, [location]);

  useEffect(() => {
    const fetchVariants = async () => {
      const { data } = await ProductService.getProductVariants(
        state.product.slug
      );

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

  const handleClose = () => {
    if (location.state) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Dialog open onClose={handleClose}>
        <div className="headless-bg">
          <Dialog.Panel className="headless-popup">
            <div className="modal-body headless-content">
              <div className="wrap-modal-slider container-fluid ps-quickview__body">
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
                  <div className="row">
                    <div className="col-12 col-xl-6">
                      <div className="ps-product--gallery">
                        <Slider
                          ref={(slider) => setMainSlickRef(slider)}
                          asNavFor={thumbNailSlickRef}
                          {...MainSlick}
                          className="ps-product__thumbnail"
                        >
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
                        </Slider>
                        <Slider
                          ref={(slider) => setThumbNailSlickRef(slider)}
                          asNavFor={mainSlickRef}
                          {...ThumbnailSlick}
                          className="ps-gallery--image"
                          style={{ display: "block" }}
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
                      <div
                        className="ps-product__info row no-gutters"
                        style={{ marginTop: 20, marginBottom: 20 }}
                      >
                        <div className="ps-product__branch col-md-12">
                          {state?.product?.categories?.map((category) => (
                            <a>{category.title}</a>
                          )) || <Skeleton />}
                        </div>
                        <Dialog.Title className={"ps-product__title col-md-12"}>
                          <a>{state?.product?.title || <Skeleton />}</a>
                        </Dialog.Title>

                        <div className="ps-product__desc col-md-12">
                          {state?.product?.description ? (
                            <Dialog.Description
                              className={"product_modal_desc"}
                              dangerouslySetInnerHTML={{
                                __html: state?.product?.description,
                              }}
                            ></Dialog.Description>
                          ) : (
                            <Skeleton count={4} />
                          )}
                        </div>
                        <div
                          className="ps-product__meta col-md-12"
                          style={{ marginTop: 0 }}
                        >
                          {state.productVaraintsLoaded &&
                          state?.currentVaraint ? (
                            <span className="ps-product__price">
                              ${state.currentVaraint.price.toLocaleString()}
                            </span>
                          ) : (
                            <Skeleton height={52} width={"35%"} />
                          )}

                          <h6 style={{ marginTop: 20 }}>Variants</h6>
                          {state.productVaraintsLoaded ? (
                            <div
                              className="row no-gutters"
                              style={{ width: "100%" }}
                            >
                              {state.productVariants.map((productVariant) => (
                                <div
                                  className={classNames(
                                    "product-variant",
                                    "col-md-4",
                                    {
                                      active:
                                        productVariant.id ===
                                        state.currentVaraint.id,
                                    }
                                  )}
                                  onClick={() =>
                                    handleSelectVariant(productVariant)
                                  }
                                >
                                  <h6>{productVariant.label}</h6>
                                  <h6
                                    style={{
                                      color: "#fd8d27",
                                      marginBottom: 0,
                                      marginTop: 5,
                                    }}
                                  >
                                    ${productVariant.price.toLocaleString()}
                                  </h6>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div
                              className="col-md-12"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div style={{ width: "33%" }}>
                                <Skeleton height={67} width={"100%"} />
                              </div>

                              <div style={{ width: "33%" }}>
                                <Skeleton height={67} width={"100%"} />
                              </div>

                              <div style={{ width: "33%" }}>
                                <Skeleton height={67} width={"100%"} />
                              </div>
                            </div>
                          )}
                        </div>

                        <button
                          type="submit"
                          style={{ marginTop: 40 }}
                          className="ps-btn ps-btn--warning"
                          onClick={handleAddToCart}
                        >
                          Add to cart
                        </button>
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
