import { useAppDispatch } from "@/src/hooks";
import { removeItemFromCart } from "@/src/redux/cartSlice";
import { ICartItem } from "@/src/types/models";
import React from "react";
import { toast } from "react-toastify";

interface CartMiniItemProps
  extends Pick<
    ICartItem,
    "id" | "name" | "price" | "quantity" | "associatedModel"
  > {}

const CartMiniItem: React.FC<CartMiniItemProps> = ({
  name,
  price,
  quantity,
  id,
  associatedModel,
}: CartMiniItemProps) => {
  const dispatch = useAppDispatch();

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
    <div className="ps-product--mini-cart">
      <a className="ps-product__thumbnail" href="">
        {associatedModel.images && associatedModel.images.length > 0 ? (
          <img src={`/storage/${associatedModel.images[0]}`} alt={name} />
        ) : null}
      </a>
      <div className="ps-product__content">
        <a className="ps-product__name" href="">
          {name} x{quantity}
        </a>
        <p className="ps-product__meta">
          <span className="ps-product__price">${price.toLocaleString()}</span>
        </p>
      </div>
      <a
        className="ps-product__remove"
        onClick={() => removeItem()}
        style={{ cursor: "pointer" }}
      >
        <i className="icon-cross"></i>
      </a>
    </div>
  );
};

export default CartMiniItem;
