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

  const { title, id, slug, images, with_checkout, min_price } = props;
  const [fetching, setIsFetch] = useState(false);

  const productURL = React.useMemo(
    () =>
      !props.fullPage
        ? `/home/product/modal/${slug}`
        : `/catalog/product/${slug}`,
    [props]
  );

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
              to={productURL}
              state={{
                background: props.fullPage ? null : location,
                product: props,
                category: props.category,
              }}
            >
              <figure>
                {images.slice(0, 2).map((image) => (
                  <img
                    src={`/storage/${image.path}`}
                    alt={image.alt ? image.alt : title}
                  />
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
                      : `/catalog/product/${slug}`2
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
            <div className="product-wrapper">
              <div className="meta-wrapper">
                {props.categories.map((category, index) => (
                  <Link
                    to={`/catalog/${category.slug}`}
                    className="ps-product__branch"
                    key={`category-card-product-${category.id}`}
                  >
                    {category.title}{" "}
                    {index < props.categories.length - 1 ? " | " : ""}
                  </Link>
                ))}
              </div>
            </div>

            <h5 className="ps-product__title">
              <Link
                to={productURL}
                state={{
                  background: props.fullPage ? null : location,
                  product: props,
                  category: props.category,
                }}
                style={{ fontWeight: 600 }}
              >
                {title}
              </Link>
            </h5>
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
                  to={productURL}
                  state={{
                    background: props.fullPage ? null : location,
                    product: props,
                    category: props.category,
                  }}
                >
                  Add to cart
                </Link>
              </div>

              <Link
                to={productURL}
                state={{
                  background: props.fullPage ? null : location,
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
};

export default ProductCard;
