import React, { useContext, useEffect, useRef } from "react";
import withProductControl, {
  WithProductsControlProps,
} from "@/src/hoc/withProductControl";
import { Link, Path, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {
  FAQProduct,
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
import SelectProductFile from "@/src/components/SelectProductFile";
import { SelectProductFileRef } from "@/src/components/SelectProductFile/SelectProductFile";
import ProductSkeleton from "./ProductSkeleton";

type Props = WithProductsControlProps;

interface ILocation extends Path {
  state: {
    product: IProduct;
    category?: ICategory;
  };
}

const ProductShow: React.FC<Props> = ({ submitAddToCart, ...props }: Props) => {
  const location: ILocation = useLocation();
  const { state, setState } = useContext(ProductFormContext);
  const dragAndDropRef = useRef<SelectProductFileRef>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      unlock(document.body);
    };
  }, []);

  useEffect(() => {
    const target = document.body;

    if (props.loading) {
      lock(target);
    } else {
      unlock(target);
    }
  }, [props.loading]);

  const handleAddToCart = () => {
    if (state.selectedOption.need_file) {
      dragAndDropRef.current.showModal();
    } else {
      submitAddToCart();
    }
  };

  if (props.loading === true) {
    return <ProductSkeleton />;
  }

  return (
    <div className="ps-page--product-variable">
      <div className="container">
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
            props.product.categories.length > 0 && (
              <li
                className="ps-breadcrumb__item"
                key={`breadcumbs-${props.product.categories[0].slug}`}
              >
                <Link to={`/catalog/${props.product.categories[0].slug}`}>
                  {props.product.categories[0].title}
                </Link>
              </li>
            )
          )}

          <li className="ps-breadcrumb__item">
            <span>{props.product.title}</span>
          </li>
        </ul>

        <div className="ps-page__content" style={{ marginBottom: "20px" }}>
          <div className="ps-product--detail">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-12 col-xl-6">
                    <ProductSlider
                      images={props.product.images}
                      productName={props.product.title}
                    />
                  </div>
                  <div className="col-12 col-xl-6">
                    <div className="ps-product__info">
                      <div className="ps-product__branch">
                        {props.product.categories?.map((category) => (
                          <Link
                            to={`/catalog/${category.slug}`}
                            key={`cat-${category.slug}`}
                          >
                            {category.title}
                          </Link>
                        ))}
                      </div>
                      <div className="ps-product__title">
                        <a>{props.product.title}</a>
                      </div>
                      <div className="ps-product__desc">
                        <p
                          className={"product_modal_desc"}
                          dangerouslySetInnerHTML={{
                            __html: props.product.description,
                          }}
                        ></p>
                      </div>
                      <div>
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
                      </div>
                      <div>
                        <div
                          className="ps-product__meta"
                          style={{
                            marginTop: 0,
                            borderBottom: "1px solid #f0f2f5",
                          }}
                        >
                          {props.product.with_checkout ? (
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
                                  <ProductCalculator />
                                </div>
                              ) : null}
                            </>
                          ) : (
                            <ModalContentWithForm product={props.product} />
                          )}
                        </div>

                        {props.product.with_checkout ? (
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

            {props.product.faq && (
              <div className="ps-product__content mt-50">
                <h2 className="ps-title">F.A.Q</h2>

                <FAQProduct questions={props.product.faq} />
              </div>
            )}
          </div>

          <SelectProductFile
            ref={dragAndDropRef}
            submitHandler={(files) => submitAddToCart(files)}
          />

          {/* <section className="ps-section--latest"></section> */}
        </div>
      </div>
    </div>
  );
};

export default withProductControl(ProductShow);
