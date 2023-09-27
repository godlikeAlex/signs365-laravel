import { useAppSelector } from "@/src/hooks";
import classNames from "classnames";
import React from "react";
import CartMiniItem from "../CartMiniItem";
import { Zoom } from "react-preloaders";
import { Lines } from "react-preloaders";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

interface Props {
  active: boolean;
}

const MiniCartModal: React.FC<Props> = ({ active }: Props) => {
  const { loaded, cart } = useAppSelector((state) => state.cart);

  return (
    <div
      className={classNames("ps-cart--mini", {
        active,
      })}
    >
      {loaded ? (
        <>
          {cart.items.length > 0 ? (
            <>
              <ul className="ps-cart__items">
                <li className="ps-cart__item">
                  {cart.items.map((item, index) => {
                    if (index <= 2) {
                      return <CartMiniItem {...item} key={item.id} />;
                    }
                  })}
                </li>
              </ul>
              <div className="ps-cart__total">
                <span>Subtotal </span>
                <span>${cart.total_with_tax.toLocaleString()}</span>
              </div>
              <div className="ps-cart__footer">
                <Link className="ps-btn ps-btn--outline" to="/cart">
                  View Cart
                </Link>
                <Link className="ps-btn ps-btn--warning" to="/cart/checkout">
                  Checkout
                </Link>
              </div>
            </>
          ) : (
            <div className="ps-cart__empty">
              <div className="ps-cart__icon">
                <i className="fa fa-shopping-basket"></i>
              </div>
              <p className="ps-cart__text">Your cart is currently empty</p>
            </div>
          )}
        </>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <BeatLoader />
        </div>
      )}
    </div>
  );
};

export default MiniCartModal;
