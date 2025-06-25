import { useAppDispatch } from "@/src/hooks";
import { removeItemFromCart, updateQuantity } from "@/src/redux/cartSlice";
import { CartService } from "@/src/services";
import { ICartItem } from "@/src/types/models";
import { generateAttributtesCartItem } from "@/src/utils/helpers";
import { Link, router } from "@inertiajs/react";
import React from "react";
import { toast } from "react-toastify";

interface Props extends ICartItem {}

const CartItem: React.FC<Props> = ({
  name,
  quantity,
  price,
  id,
  attributes,
  associatedModel,
}: Props) => {
  const dispatch = useAppDispatch();

  const priceWithQuantity =
    price * (attributes.productOptionType === "per_qty" ? 1 : quantity);

  const addItem = async () => {
    try {
      router.post(
        "/api/cart/update-quantity",
        {
          item_id: id,
          type: "add",
        },
        {
          onSuccess: () => {
            toast(`Successfully increased the quantity of ${name}`, {
              type: "success",
            });
          },
        }
      );
    } catch (error) {
      toast("An error occurred while adding to cart", { type: "error" });
    }
  };

  const reduceItem = async () => {
    try {
      router.post(
        "/api/cart/update-quantity",
        {
          item_id: id,
          type: "reduce",
        },
        {
          onSuccess: () => {
            toast(`Successfully reduced the quantity of ${name}`, {
              type: "success",
            });
          },
        }
      );
    } catch (error) {
      toast("An error occurred while reducing item", { type: "error" });
    }
  };

  const removeItem = async () => {
    try {
      router.post(
        "/api/cart/remove-item",
        {
          item_id: id,
        },
        {
          onSuccess: () => {
            toast(`Successfully removed ${name}`, {
              type: "success",
            });
          },
        }
      );
    } catch (error) {
      toast("An error occurred while removing item", { type: "error" });
    }
  };

  return (
    <tr>
      <td className="ps-product__remove">
        <a href="#" onClick={removeItem}>
          <i className="icon-cross"></i>
        </a>
      </td>
      <td className="ps-product__thumbnail">
        <a className="ps-product__image">
          <figure>
            {associatedModel.images && associatedModel.images.length > 0 ? (
              <img
                src={`/storage/${associatedModel.images[0].path}`}
                alt={
                  associatedModel.images[0].alt
                    ? associatedModel.images[0].alt
                    : name
                }
              />
            ) : null}
          </figure>
        </a>
      </td>
      <td className="ps-product__name">
        <Link href={`/shop/product/${associatedModel.slug}`}>
          {name}
          <p>{generateAttributtesCartItem(attributes)}</p>
        </Link>
      </td>
      <td className="ps-product__meta">
        <span className="ps-product__price">${price.toLocaleString()}</span>
      </td>
      <td className="ps-product__quantity">
        <div className="def-number-input number-input safari_only">
          <button className="minus" onClick={reduceItem}>
            <i className="icon-minus"></i>
          </button>
          <input
            className="quantity"
            min="1"
            name="quantity"
            value={quantity}
            type="number"
            readOnly
          />
          <button className="plus" onClick={addItem}>
            <i className="icon-plus"></i>
          </button>
        </div>
      </td>
      <td className="ps-product__subtotal">
        ${priceWithQuantity.toLocaleString()}
      </td>
    </tr>
  );
};

export default CartItem;
