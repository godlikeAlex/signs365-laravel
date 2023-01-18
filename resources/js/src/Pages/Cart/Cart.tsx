import { CartList } from "@/src/components";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import { clearCart } from "@/src/redux/cartSlice";
import React from "react";
import { toast } from "react-toastify";

interface CartProps {}

const Cart: React.FC<CartProps> = ({}: CartProps) => {
  const dispatch = useAppDispatch();
  const { cart, loaded } = useAppSelector((state) => state.cart);

  const handleClearCart = async () => {
    try {
      await dispatch(clearCart()).unwrap();

      toast(`Successfully cleared`, {
        type: "success",
      });
    } catch (error) {
      toast("An error occurred while clearing cart", { type: "error" });
    }
  };

  if (!loaded) {
    return <h2>Cart is loading...</h2>;
  }

  const renderCart = () => {
    return (
      <>
        <h1>Shopping cart:</h1>
        <button onClick={handleClearCart}>Clear Cart</button>
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
