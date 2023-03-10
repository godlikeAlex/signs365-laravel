import React, { useEffect, useState } from "react";
import withProductControl, {
  WithProductsControlProps,
} from "@/src/hoc/withProductControl";
import { Link, Path, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { ProductSlider } from "@/src/components";
import ModalContentWithForm from "../ModalShowProduct/ModalContentWithForm";
import { ICategory, IProduct } from "@/src/types/models";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ps-page--product-variable">
      <div className="container">
        <ul className="ps-breadcrumb">
          {product ? (
            <li>
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
            </li>
          ) : (
            <Skeleton />
          )}
        </ul>

        <div className="ps-page__content">
          <div className="ps-product--detail">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-12 col-xl-5">
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
                  <div className="col-12 col-xl-7">
                    <div className="ps-product__info">
                      <div className="ps-product__branch">
                        {product?.categories?.map((category) => (
                          <Link to={`/catalog/${category.slug}`}>
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
                          <i className="icon-truck"></i>Free delivery for order
                          over $200
                        </li>
                      </ul>
                      <div className="no-gutters row">
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
                          <div className="col-md-5">
                            <button
                              type="submit"
                              style={{ marginTop: 20 }}
                              className="ps-btn ps-btn--warning"
                              onClick={handleAddToCart}
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
    </div>
  );
};

export default withProductControl(ProductShow);
