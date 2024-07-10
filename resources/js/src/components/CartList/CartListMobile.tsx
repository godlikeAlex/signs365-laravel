import { useAppDispatch } from "@/src/hooks";
import { removeItemFromCart } from "@/src/redux/cartSlice";
import { ICartItem } from "@/src/types/models";
import React from "react";
import { toast } from "react-toastify";
import CartItem from "../CartItem";
import { generateAttributtesCartItem } from "@/src/utils/helpers";

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
      {items.map(
        ({ id, price, attributes, quantity, associatedModel, name }) => {
          const priceWithQuantity =
            price * (attributes.productOptionType === "per_qty" ? 1 : quantity);

          return (
            <li id={id}>
              <div className="ps-product ps-product--wishlist">
                <div className="ps-product__remove">
                  <a href="#" onClick={() => removeItem(id)}>
                    <i className="icon-cross"></i>
                  </a>
                </div>
                <div className="ps-product__thumbnail">
                  <a className="ps-product__image">
                    <figure>
                      {associatedModel.images &&
                      associatedModel.images.length > 0 ? (
                        <img
                          src={`/storage/${associatedModel.images[0].path}`}
                          alt={associatedModel.images[0].alt}
                        />
                      ) : null}
                    </figure>
                  </a>
                </div>
                <div className="ps-product__content">
                  <h5 className="ps-product__title">
                    <a href="">{name}</a>

                    <p>{generateAttributtesCartItem(attributes)}</p>
                  </h5>
                  <div className="ps-product__row">
                    <div className="ps-product__label">Price:</div>
                    <div className="ps-product__value">
                      <span className="ps-product__price">
                        ${price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="ps-product__row ps-product__quantity">
                    <div className="ps-product__label">Quantity:</div>
                    <div className="ps-product__value">{quantity}</div>
                  </div>
                  <div className="ps-product__row ps-product__subtotal">
                    <div className="ps-product__label">Subtotal:</div>
                    <div className="ps-product__value">
                      ${priceWithQuantity.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        }
      )}
    </ul>
  );
};

export default CartListMobile;
