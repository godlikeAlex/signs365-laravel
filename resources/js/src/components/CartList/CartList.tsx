import { ICartItem } from "@/src/types/models";
import React from "react";
import CartItem from "../CartItem";

interface Props {
  items: ICartItem[];
}

const CartList: React.FC<Props> = ({ items }: Props) => {
  return (
    <>
      {items.map((item) => (
        <CartItem {...item} key={item.id} />
      ))}
    </>
  );
};

export default CartList;
