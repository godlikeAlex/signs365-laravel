import { useAppSelector } from "@/src/hooks";
import classNames from "classnames";
import React from "react";
import CartMiniItem from "../CartMiniItem";
import { Zoom } from "react-preloaders";
import { Lines } from "react-preloaders";
import { BeatLoader } from "react-spinners";

interface Props {
  active: boolean;
}

const MiniCartModal: React.FC<Props> = ({ active }: Props) => {
  const { loaded, cart } = useAppSelector((state) => state.cart);

  return (
    <div
      className={classNames("ps-cart--mini", {
        active: active,
      })}
    >
      {loaded ? (
        <>
          {cart.items.length > 0 ? (
            <>
              <ul className="ps-cart__items">
                <li className="ps-cart__item">
                  <CartMiniItem />
                </li>
              </ul>
              <div className="ps-cart__total">
                <span>Subtotal </span>
                <span>$ {cart.total_with_tax.toLocaleString()}</span>
              </div>
              <div className="ps-cart__footer">
                <a className="ps-btn ps-btn--outline" href="shopping-cart.html">
                  View Cart
                </a>
                <a className="ps-btn ps-btn--warning" href="checkout.html">
                  Checkout
                </a>
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
