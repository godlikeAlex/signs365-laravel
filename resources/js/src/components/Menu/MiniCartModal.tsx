import { useAppSelector } from "@/src/hooks";
import classNames from "classnames";
import React from "react";
import CartMiniItem from "../CartMiniItem";
import { Zoom } from "react-preloaders";
import { Lines } from "react-preloaders";
import { BeatLoader } from "react-spinners";
import { Link, usePage } from "@inertiajs/react";
import { SharedInertiaData } from "@/src/types/inertiaTypes";

interface Props {
  active: boolean;
}

const MiniCartModal: React.FC<Props> = ({ active }: Props) => {
  const { cart } = usePage<SharedInertiaData>().props;

  return (
    <div
      className={classNames("ps-cart--mini", {
        active,
      })}
    >
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
            <span>Total </span>
            <span>${cart.total_with_tax.toLocaleString()}</span>
          </div>
          <div className="ps-cart__footer">
            <Link className="button button--alt" href="/cart">
              View Cart
            </Link>
            <Link className="button " href="/checkout">
              Checkout
            </Link>
          </div>
        </>
      ) : (
        <div className="ps-cart__empty">
          <div className="ps-cart__icon">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <p className="ps-cart__text">Your cart is currently empty</p>
        </div>
      )}
    </div>
  );
};

export default MiniCartModal;
