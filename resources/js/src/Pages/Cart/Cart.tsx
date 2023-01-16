import { CartList } from "@/src/components";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import React from "react";

interface CartProps {}

const Cart: React.FC<CartProps> = ({}: CartProps) => {
  const dispatch = useAppDispatch();
  const { cart, loaded } = useAppSelector((state) => state.cart);

  if (!loaded) {
    return <h2>Cart is loading...</h2>;
  }

  const renderCart = () => {
    return (
      <>
        <h1>Shopping cart:</h1>

        <CartList items={cart.items} />
      </>
    );
  };

  const renderEmptyCart = () => {
    return <h1>Cart is Empty</h1>;
  };

  return <div>{cart.items.length > 0 ? renderCart() : renderEmptyCart()}</div>;
};

export default Cart;
