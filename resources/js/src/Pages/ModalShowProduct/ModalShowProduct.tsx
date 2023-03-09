import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";

import {
  matchPath,
  Outlet,
  Path,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { IProduct, IProductVaraint } from "@/src/types/models";
import { Input, VariantsProductPlaceholder } from "@/src/components";
import ProductService from "@/src/services/ProductService";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { addToCart } from "@/src/redux/cartSlice";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "./style.css";
import classNames from "classnames";
import { Helmet } from "react-helmet";
import ModalContentWithForm from "./ModalContentWithForm";
import FullModalProduct from "./FullModalProduct";
import { useMediaQuery } from "react-responsive";
import { MainSlick, ThumbnailSlick } from "./sliderConfig";
import {
  clearProductState,
  getProduct,
  getProductVariants,
  selectProductVariant,
  setProduct,
} from "@/src/redux/singleProductSlice";

interface Props {
  fullPage?: boolean;
}

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

const ModalShowProduct: React.FC<Props> = ({ fullPage }: Props) => {
  const params = useParams<"slug">();
  const location: ILocation = useLocation();
  const navigate = useNavigate();

  const {
    loading,
    product,
    currentVaraint,
    productVaraintsLoaded,
    productVariants,
  } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  const [mainSlickRef, setMainSlickRef] = useState(null);
  const [thumbNailSlickRef, setThumbNailSlickRef] = useState(null);
  const isMobile = useMediaQuery({ query: "(max-width: 720px)" });

  useEffect(() => {
    return () => {
      dispatch(clearProductState());
    };
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!location?.state?.product) {
        // need fetch PRODUCT if joined by link
        try {
          dispatch(getProduct({ slug: params.slug })).unwrap();
        } catch (error) {
          toast("Product not found", { type: "error" });
          console.log(error);
          navigate("/");
        }
      } else {
        dispatch(setProduct(location.state.product));
      }
    };

    fetchProduct();
  }, [params]);

  useEffect(() => {
    const fetchVariants = async () => {
      const varinats = await dispatch(
        getProductVariants({ slug: product.slug })
      ).unwrap();

      if (varinats.length === 0) {
        toast("Variants not found, try reload page", { type: "warning" });
      }
    };

    if (product) {
      fetchVariants();
    }
  }, [product]);

  const handleSelectVariant = (productVariant: IProductVaraint) => {
    dispatch(selectProductVariant(productVariant));
  };

  const handleAddToCart = async () => {
    dispatch(
      addToCart({
        product_id: product.id,
        product_variant_id: currentVaraint.id,
      })
    );
    toast("Successfully added to cart", { type: "success" });
  };

  const handleClose = () => {
    navigate(-1);
  };

  const renderVariants = () => (
    <>
      {productVaraintsLoaded && currentVaraint ? (
        <span className="ps-product__price">
          ${currentVaraint.price.toLocaleString()}
        </span>
      ) : (
        <Skeleton height={52} width={"35%"} />
      )}

      <h6 style={{ marginTop: 20 }}>Variants</h6>
      {productVaraintsLoaded ? (
        <div className="row no-gutters" style={{ width: "100%" }}>
          {productVariants.map((productVariant) => (
            <div className="col-md-4 cust-padding">
              <div
                className={classNames("product-variant", {
                  active: productVariant.id === currentVaraint.id,
                })}
                onClick={() => handleSelectVariant(productVariant)}
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
    </>
  );

  const modal = () => (
    <Dialog open onClose={handleClose}>
      <div className="headless-bg">
        <Dialog.Panel className="headless-popup">
          <div className="modal-body headless-content">
            <div className="wrap-modal-slider  ps-quickview__body">
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
                              <img
                                src={`/storage/${img}`}
                                alt={product.title}
                              />
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
                      <Dialog.Title className={"ps-product__title col-md-12"}>
                        <a>{product?.title || <Skeleton />}</a>
                      </Dialog.Title>

                      <div className="ps-product__desc col-md-12">
                        {product?.description ? (
                          <Dialog.Description
                            className={"product_modal_desc"}
                            dangerouslySetInnerHTML={{
                              __html: product?.description,
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
                          className="ps-btn ps-btn--warning"
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
        </Dialog.Panel>
      </div>
    </Dialog>
  );

  return (
    <>
      {product ? (
        <Helmet>
          <title>{product?.title}</title>
        </Helmet>
      ) : null}

      {fullPage ? (
        <FullModalProduct
          renderVariants={renderVariants}
          product={product}
          handleAddToCart={handleAddToCart}
          handleClose={handleClose}
        />
      ) : (
        modal()
      )}
    </>
  );
};

export default ModalShowProduct;
