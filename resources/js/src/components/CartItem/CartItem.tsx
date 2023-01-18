import { useAppDispatch } from "@/src/hooks";
import { removeItemFromCart, updateQuantity } from "@/src/redux/cartSlice";
import { CartService } from "@/src/services";
import { ICartItem } from "@/src/types/models";
import React from "react";
import { toast } from "react-toastify";

interface Props extends ICartItem {}

const CartItem: React.FC<Props> = ({
  name,
  quantity,
  price,
  id,
  attributes,
}: Props) => {
  const dispatch = useAppDispatch();

  const addItem = async () => {
    try {
      await dispatch(updateQuantity({ type: "add", item_id: id })).unwrap();

      toast(`Successfully increased the quantity of ${name}`, {
        type: "success",
      });
    } catch (error) {
      toast("An error occurred while adding to cart", { type: "error" });
    }
  };

  const reduceItem = async () => {
    try {
      await dispatch(updateQuantity({ type: "reduce", item_id: id })).unwrap();

      toast(`Successfully reduced the quantity of ${name}`, {
        type: "success",
      });
    } catch (error) {
      toast("An error occurred while reducing item", { type: "error" });
    }
  };

  const removeItem = async () => {
    try {
      await dispatch(removeItemFromCart({ item_id: id })).unwrap();

      toast(`Successfully removed ${name}`, {
        type: "success",
      });
    } catch (error) {
      toast("An error occurred while removing item", { type: "error" });
    }
  };

  return (
    <div style={{ border: "1px solid red" }}>
      <h4>{name}</h4>

      <h5>{attributes.product_variant.label}</h5>

      <div>
        <button onClick={reduceItem}>Remove one</button>
        {quantity}
        <button onClick={addItem}>Add One</button>
      </div>

      <h5>Price: {(price * quantity).toLocaleString()} $ </h5>

      <button onClick={removeItem}>Remove Item</button>
    </div>
  );
};

export default CartItem;
