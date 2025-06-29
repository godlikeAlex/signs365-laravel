import React, { useContext, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import Skeleton from "react-loading-skeleton";
import ModalContentWithForm from "./ModalContentWithForm";
import withProductControl, {
  WithProductsControlProps,
} from "@/src/hoc/withProductControl";
import {
  ProductCalculator,
  ProductOptions,
  ProductQuantity,
  ProductSlider,
} from "@/src/components";
import "./style.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import ProductAddons from "@/src/components/ProductAddons/ProductAddons";
import { ProductFormContext } from "@/src/contexts/ProductFormContext";

type Props = WithProductsControlProps;

function ModalShowProduct({
  submitAddToCart,
  handleClose,
  renderVariants,
  ...props
}: Props) {
  const isMobile = useMediaQuery({ query: "(max-width: 720px)" });
  const navigate = useNavigate();
  const params = useParams<"slug">();
  const location = useLocation();
  const { state, setState } = useContext(ProductFormContext);

  useEffect(() => {
    if (isMobile || !location.state) {
      navigate(`/catalog/product/${params.slug}`, { replace: true });
    }
  }, [isMobile, params, location]);

  if (props.loading === true) {
    return <></>;
  }

  const { product } = props;

  return (
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
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-12 col-xl-6">
                        {product?.images ? (
                          <ProductSlider
                            images={product.images}
                            productName={product.title}
                          />
                        ) : (
                          <div style={{ height: 450, marginBottom: 30 }}>
                            <Skeleton height={"100%"} />
                          </div>
                        )}
                      </div>
                      <div className="col-12 col-xl-6">
                        <div className="ps-product__info">
                          <div className="ps-product__branch">
                            {product?.categories?.map((category) => (
                              <Link to={`/shop/${category.slug}`}>
                                {category.title}
                              </Link>
                            )) || <Skeleton />}
                          </div>
                          <div className="ps-product__title">
                            {product?.title ? (
                              <a>{product.title}</a>
                            ) : (
                              <Skeleton height={45} />
                            )}
                          </div>
                          <div className="ps-product__desc">
                            {product?.description ? (
                              <p
                                className={"product_modal_desc"}
                                dangerouslySetInnerHTML={{
                                  __html: product?.description,
                                }}
                              ></p>
                            ) : (
                              <Skeleton count={4} />
                            )}
                          </div>
                          <ul className="ps-product__bundle">
                            <li>
                              <i className="icon-wallet"></i>100% Money back
                            </li>
                            <li>
                              <i className="icon-bag2"></i>Non-contact shipping
                            </li>
                            <li>
                              <i className="icon-truck"></i>Free delivery for
                              order over $200
                            </li>
                          </ul>
                          <div className="no-gutters row">
                            <div
                              className="ps-product__meta col-md-12"
                              style={{
                                marginTop: 0,
                                borderBottom: "1px solid #f0f2f5",
                              }}
                            >
                              {product?.with_checkout ? (
                                <>
                                  <div>
                                    <ProductOptions />
                                  </div>

                                  {state.selectedOption &&
                                  state.selectedOption.addons.length > 0 ? (
                                    <div style={{ marginTop: 20 }}>
                                      <ProductAddons />
                                    </div>
                                  ) : null}

                                  {state.selectedOption?.showCalculator ? (
                                    <div style={{ marginTop: 20 }}>
                                      {/* <ProductCalculator /> */}
                                    </div>
                                  ) : null}
                                </>
                              ) : (
                                <ModalContentWithForm product={product} />
                              )}
                            </div>

                            {product?.with_checkout ? (
                              <div className="col-md-12">
                                <h6 className="label-product-show">
                                  Quantity:
                                </h6>

                                <ProductQuantity
                                  value={state.quantity}
                                  onChange={(value) =>
                                    setState((state) => ({
                                      ...state,
                                      quantity: value,
                                    }))
                                  }
                                />

                                <span className="price-product">
                                  {state.calculatedPrice || "0.00"} $
                                </span>

                                <button
                                  type="submit"
                                  className="ps-btn ps-btn--warning"
                                  onClick={() => submitAddToCart()}
                                  style={{ marginTop: 20 }}
                                  disabled={state.disabled}
                                >
                                  Add to cart
                                </button>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
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
}

export default withProductControl(ModalShowProduct);
