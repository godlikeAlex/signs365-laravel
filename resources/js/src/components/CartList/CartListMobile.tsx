import { useAppDispatch } from "@/src/hooks";
import { removeItemFromCart } from "@/src/redux/cartSlice";
import { ICartItem } from "@/src/types/models";
import React from "react";
import { toast } from "react-toastify";
import CartItem from "../CartItem";

interface Props {
  items: ICartItem[];
}

const CartListMobile: React.FC<Props> = ({ items }: Props) => {
  const dispatch = useAppDispatch();

  const removeItem = async (id: string) => {
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
    <ul className="ps-shopping__list">
      {items.map((cartItem) => (
        <li id={cartItem.id}>
          <div className="ps-product ps-product--wishlist">
            <div className="ps-product__remove">
              <a href="#" onClick={() => removeItem(cartItem.id)}>
                <i className="icon-cross"></i>
              </a>
            </div>
            <div className="ps-product__thumbnail">
              <a className="ps-product__image">
                <figure>
                  {cartItem.associatedModel.images &&
                  cartItem.associatedModel.images.length > 0 ? (
                    <img
                      src={`/storage/${cartItem.associatedModel.images[0]}`}
                      alt={name}
                    />
                  ) : null}
                </figure>
              </a>
            </div>
            <div className="ps-product__content">
              <h5 className="ps-product__title">
                <a href="">{cartItem.name}</a>
              </h5>
              <div className="ps-product__row">
                <div className="ps-product__label">Price:</div>
                <div className="ps-product__value">
                  <span className="ps-product__price">
                    ${cartItem.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="ps-product__row ps-product__quantity">
                <div className="ps-product__label">Quantity:</div>
                <div className="ps-product__value">{cartItem.quantity}</div>
              </div>
              <div className="ps-product__row ps-product__subtotal">
                <div className="ps-product__label">Subtotal:</div>
                <div className="ps-product__value">
                  ${(cartItem.price * cartItem.quantity).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartListMobile;
