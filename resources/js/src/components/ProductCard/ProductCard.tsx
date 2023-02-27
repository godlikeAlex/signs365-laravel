import { useAppDispatch } from "@/src/hooks";
import { IProduct } from "@/src/types/models";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

interface Props extends IProduct {}

const ProductCard: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { title, start_at, id, slug } = props;

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
      <div className="ps-section__product">
        <div className="ps-product ps-product--standard">
          <div className="ps-product__thumbnail">
            <Link
              className="ps-product__image"
              to={`/home/product/modal/${slug}`}
              state={{ backgroundLocation: location, product: props }}
            >
              <figure>
                <img src="img/products/054.jpg" alt="alt" />
                <img src="img/products/057.jpg" alt="alt" />
              </figure>
            </Link>
            <div className="ps-product__actions">
              <div
                className="ps-product__item"
                data-toggle="tooltip"
                data-placement="left"
                title="Quick view"
              >
                <Link
                  to={`/home/product/modal/${slug}`}
                  state={{ backgroundLocation: location, product: props }}
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
                  to={`/home/product/modal/${slug}`}
                  state={{ backgroundLocation: location, product: props }}
                >
                  <i className="fa fa-shopping-basket"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="ps-product__content">
            <h5 className="ps-product__title">
              <Link
                to={`/home/product/modal/${slug}`}
                state={{ backgroundLocation: location, product: props }}
              >
                {title}
              </Link>
            </h5>
            <div className="ps-product__meta">
              <span className="ps-product__price">$299.99</span>
            </div>
            <div className="ps-product__desc">
              <ul className="ps-product__list">
                <li>Study history up to 30 days</li>
                <li>Up to 5 users simultaneously</li>
                <li>Has HEALTH certificate</li>
              </ul>
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
                  to={`/home/product/modal/${slug}`}
                  state={{ backgroundLocation: location, product: props }}
                >
                  Add to cart
                </Link>
              </div>
              <div
                className="ps-product__item cart"
                data-toggle="tooltip"
                data-placement="left"
                title="Add to cart"
              >
                <Link
                  to={`/home/product/modal/${slug}`}
                  state={{ backgroundLocation: location, product: props }}
                >
                  <i className="fa fa-shopping-basket"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );

  return (
    <div>
      <h4>{title}</h4>

      <h6>{(start_at / 100).toLocaleString()}</h6>

      <Link
        to={`/home/product/modal/${slug}`}
        state={{ backgroundLocation: location, product: props }}
      >
        Show Product
      </Link>
    </div>
  );
};

export default ProductCard;
