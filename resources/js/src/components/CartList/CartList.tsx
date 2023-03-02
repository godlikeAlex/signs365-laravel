import { ICartItem } from "@/src/types/models";
import React from "react";
import CartItem from "../CartItem";

interface Props {
  items: ICartItem[];
}

const CartList: React.FC<Props> = ({ items }: Props) => {
  return (
    <div className="ps-shopping__table">
      <table className="table ps-table ps-table--product">
        <thead>
          <tr>
            <th className="ps-product__remove"></th>
            <th className="ps-product__thumbnail"></th>
            <th className="ps-product__name">Product name</th>
            <th className="ps-product__meta">Unit price</th>
            <th className="ps-product__quantity">Quantity</th>
            <th className="ps-product__subtotal">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((cartItem) => (
            <CartItem {...cartItem} id={cartItem.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartList;
