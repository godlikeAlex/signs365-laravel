import { ICartItem } from "@/src/types/models";
import React from "react";

interface Props extends ICartItem {}

const CartItem: React.FC<Props> = ({ name, quantity, price }: Props) => {
  return (
    <div>
      <h4>
        {name} x {quantity}
      </h4>

      <h5>Price: {(price * quantity).toLocaleString()} $ </h5>
    </div>
  );
};

export default CartItem;
