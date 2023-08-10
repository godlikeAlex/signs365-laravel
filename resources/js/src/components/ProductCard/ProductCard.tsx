import { useAppDispatch } from "@/src/hooks";
import { IProduct } from "@/src/types/ProductModel";
import { ICategory } from "@/src/types/models";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

type Props = IProduct & {
  fullPage?: boolean;
  category?: ICategory;
};

const ProductCard: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { title, id, slug, images, with_checkout } = props;
  const [fetching, setIsFetch] = useState(false);

  const handleAddToCart = async () => {
    setIsFetch(true);

    try {
      setIsFetch(false);
    } catch (error) {
      setIsFetch(false);
    }
  };

  return (
    <>
      <div className="ps-section__product" style={{ height: "100%" }}>
        <div
          className="ps-product ps-product--standard"
          style={{ height: "100%" }}
        >
          <div className="ps-product__thumbnail ps-product__thumbnail-card">
            <Link
              className="ps-product__image"
              to={
                !props.fullPage
                  ? `/home/product/modal/${slug}`
                  : `/catalog/product/${slug}`
              }
              state={{
                background: !props.fullPage && location,
                product: props,
                category: props.category,
              }}
            >
              <figure>
                {images.slice(0, 2).map((image) => (
                  <img src={`/storage/${image}`} alt={title} />
                ))}
              </figure>
            </Link>
            {/* <div className="ps-product__actions">
              <div
                className="ps-product__item"
                data-toggle="tooltip"
                data-placement="left"
                title="Quick view"
              >
                <Link
                  to={
                    !props.fullPage
                      ? `/home/product/modal/${slug}`
                      : `/catalog/product/${slug}`
                  }
                  state={{
                    background: !props.fullPage && location,
                    product: props,
                    category: props.category,
                  }}
                >
                  <i className="fa fa-search"></i>
                </Link>
              </div>
              <div
                className="ps-product__item"
                data-toggle="tooltip"
                data-placement="left"
                title="Add to cart"
              >
                <Link
                  to={
                    !props.fullPage
                      ? `/home/product/modal/${slug}`
                      : `/catalog/product/${slug}`
                  }
                  state={{
                    background: !props.fullPage && location,
                    product: props,
                    category: props.category,
                  }}
                >
                  <i className="fa fa-shopping-basket"></i>
                </Link>
              </div>
            </div> */}
          </div>
          <div className="ps-product__content">
            <h5 className="ps-product__title">
              <Link
                to={
                  !props.fullPage
                    ? `/home/product/modal/${slug}`
                    : `/catalog/product/${slug}`
                }
                state={{
                  background: !props.fullPage && location,
                  product: props,
                  category: props.category,
                }}
              >
                {title}
              </Link>
            </h5>
            <div className="ps-product__meta">
              <span className="ps-product__price">
                {with_checkout ? `25` : null}
              </span>
            </div>

            <div className="ps-product__actions ps-product__group-mobile">
              <div className="ps-product__quantity">
                <div className="def-number-input number-input safari_only">
                  <button
                    className="minus"
                    // onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                  >
                    <i className="icon-minus"></i>
                  </button>
                  <input
                    className="quantity"
                    min="0"
                    name="quantity"
                    value="1"
                    type="number"
                  />
                  <button
                    className="plus"
                    // onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                  >
                    <i className="icon-plus"></i>
                  </button>
                </div>
              </div>
              <div className="ps-product__cart">
                <Link
                  className="ps-btn ps-btn--warning"
                  to={
                    !props.fullPage
                      ? `/home/product/modal/${slug}`
                      : `/catalog/product/${slug}`
                  }
                  state={{
                    background: !props.fullPage && location,
                    product: props,
                    category: props.category,
                  }}
                >
                  Add to cart
                </Link>
              </div>

              <Link
                to={
                  !props.fullPage
                    ? `/home/product/modal/${slug}`
                    : `/catalog/product/${slug}`
                }
                state={{
                  background: !props.fullPage && location,
                  product: props,
                  category: props.category,
                }}
              >
                <button className="ps-btn ps-btn--warning">Details</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //   <div>
  //     <h4>{title}</h4>

  //     <h6>{(start_at / 100).toLocaleString()}</h6>

  //     <Link
  //       to={
  //         !props.fullPage
  //           ? `/home/product/modal/${slug}`
  //           : `/catalog/product/${slug}`
  //       }
  //       state={{ background: !props.fullPage && location, product: props }}
  //     >
  //       Show Product
  //     </Link>
  //   </div>
  // );
};

export default ProductCard;
