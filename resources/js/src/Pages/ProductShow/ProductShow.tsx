import React, { useContext, useEffect } from "react";
import withProductControl, {
  WithProductsControlProps,
} from "@/src/hoc/withProductControl";
import { Link, Path, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {
  ProductCalculator,
  ProductOptions,
  ProductQuantity,
  ProductSlider,
} from "@/src/components";
import ModalContentWithForm from "../ModalShowProduct/ModalContentWithForm";
import { ICategory } from "@/src/types/models";
import ProductAddons from "@/src/components/ProductAddons/ProductAddons";
import { ProductFormContext } from "@/src/contexts/ProductFormContext";
import { IProduct } from "@/src/types/ProductModel";
import { lock, unlock } from "tua-body-scroll-lock";

interface Props extends WithProductsControlProps {}

interface ILocation extends Path {
  state: {
    product: IProduct;
    category?: ICategory;
  };
}

const ProductShow: React.FC<Props> = ({
  product,
  loading,
  handleAddToCart,
  handleClose,
  renderVariants,
}: Props) => {
  const location: ILocation = useLocation();
  const { state, setState } = useContext(ProductFormContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      unlock(document.body);
    };
  }, []);

  useEffect(() => {
    const target = document.body;

    if (loading) {
      lock(target);
    } else {
      unlock(target);
    }
  }, [loading]);

  return (
    <div className="ps-page--product-variable">
      <div className="container">
        {product && !loading ? (
          <ul className="ps-breadcrumb">
            <li className="ps-breadcrumb__item">
              <Link to="/">Home</Link>
            </li>
            <li className="ps-breadcrumb__item">
              <span>Shop</span>
            </li>
            {location.state?.category ? (
              <li className="ps-breadcrumb__item">
                <Link to={`/catalog/${location.state.category.slug}`}>
                  {location.state.category.title}
                </Link>
              </li>
            ) : (
              product.categories.length > 0 && (
                <li
                  className="ps-breadcrumb__item"
                  key={`breadcumbs-${product.categories[0].slug}`}
                >
                  <Link to={`/catalog/${product.categories[0].slug}`}>
                    {product.categories[0].title}
                  </Link>
                </li>
              )
            )}

            <li className="ps-breadcrumb__item">
              <span>{product.title}</span>
            </li>
          </ul>
        ) : (
          <div className="ps-breadcrumb">
            <Skeleton />
          </div>
        )}

        <div className="ps-page__content">
          <div className="ps-product--detail">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-12 col-xl-6">
                    {product?.images && !loading ? (
                      <ProductSlider
                        images={product.images}
                        productName={product.title}
                      />
                    ) : (
                      <div style={{ height: 650, marginBottom: 30 }}>
                        <Skeleton height={"100%"} />
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-xl-6">
                    <div className="ps-product__info">
                      <div className="ps-product__branch">
                        {!product?.categories || loading ? (
                          <Skeleton />
                        ) : (
                          product?.categories?.map((category) => (
                            <Link
                              to={`/catalog/${category.slug}`}
                              key={`cat-${category.slug}`}
                            >
                              {category.title}
                            </Link>
                          ))
                        )}
                      </div>
                      <div className="ps-product__title">
                        {!product?.title || loading ? (
                          <Skeleton height={45} />
                        ) : (
                          <a>{product.title}</a>
                        )}
                      </div>
                      <div className="ps-product__desc">
                        {!product?.description || loading ? (
                          <Skeleton count={5} />
                        ) : (
                          <p
                            className={"product_modal_desc"}
                            dangerouslySetInnerHTML={{
                              __html: product?.description,
                            }}
                          ></p>
                        )}
                      </div>
                      <div>
                        {!product || loading ? (
                          <Skeleton count={3} />
                        ) : (
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
                        )}
                      </div>
                      <div>
                        <div
                          className="ps-product__meta"
                          style={{
                            marginTop: 0,
                            borderBottom: "1px solid #f0f2f5",
                          }}
                        >
                          {product?.with_checkout ? (
                            <>
                              <div>
                                <ProductOptions loading={loading} />
                              </div>

                              {state.selectedOption &&
                              state.selectedOption.addons.length > 0 ? (
                                <div style={{ marginTop: 20 }}>
                                  <ProductAddons loading={loading} />
                                </div>
                              ) : null}

                              {state.selectedOption?.showCalculator ? (
                                <div style={{ marginTop: 20 }}>
                                  <ProductCalculator loading={loading} />
                                </div>
                              ) : null}
                            </>
                          ) : (
                            <ModalContentWithForm
                              product={product}
                              loading={loading}
                            />
                          )}
                        </div>

                        {product?.with_checkout && !loading ? (
                          <div>
                            <h6 className="label-product-show">Quantity:</h6>

                            <ProductQuantity
                              value={state.quantity}
                              onChange={(value) =>
                                setState((state) => ({
                                  ...state,
                                  quantity: value,
                                }))
                              }
                            />

                            <span className="ps-product__price">
                              {state.calculatedPrice || "0.00"} $
                            </span>

                            <button
                              type="submit"
                              className="ps-btn ps-btn--warning"
                              onClick={handleAddToCart}
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

          <section className="ps-section--latest"></section>
        </div>
      </div>
    </div>
  );
};

export default withProductControl(ProductShow);
