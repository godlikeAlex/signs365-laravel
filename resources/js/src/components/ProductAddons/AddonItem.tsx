import classNames from "classnames";
import React, { MouseEventHandler } from "react";

import "./style-addons.css";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import {
  handleAddonChange,
  updateAddonQuantity,
} from "@/src/redux/singleProductSlice";
import { Addon } from "@/src/types/ProductModel";

interface Props {
  addon: Addon;
  error?: string;
  disabled: boolean;
}

const AddonItem: React.FC<Props> = ({ addon, error, disabled }: Props) => {
  const { withQuantity, title, id, condition, isSelected } = addon;
  const dispatch = useAppDispatch();

  const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
    let target = e.target as HTMLElement;

    if (disabled) return;

    if (target.classList.contains("can-toggle")) {
      dispatch(handleAddonChange(addon));
    }
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (disabled) return;

    dispatch(updateAddonQuantity({ addonID: addon.id, quantity: +value }));
  };

  const handlePressButtonQuantity = (type: "+" | "-") => {
    if (!addon.withQuantity) return;

    dispatch(
      updateAddonQuantity({
        addonID: addon.id,
        quantity: type === "+" ? addon.quantity + 1 : addon.quantity - 1,
      })
    );
  };

  return (
    <div
      className={classNames("product-variant product-addon can-toggle", {
        "active-variant": isSelected,
        "disabled-variant": disabled,
      })}
      onClick={handleOnClick}
    >
      <h6 className="can-toggle">{title}</h6>

      {withQuantity && isSelected ? (
        <div style={{ marginTop: 12 }} className="can-toggle">
          Quantity
          <div className="quantity-container-addon">
            <div
              className="qty-btn-addon"
              onClick={() => handlePressButtonQuantity("-")}
            >
              <i className="icon-minus" />
            </div>
            <input
              className="qty-input-addon"
              value={addon.quantity}
              min={addon.validation["min-qty"]}
              max={addon.validation["max-qty"]}
              onChange={handleChangeQuantity}
            />
            <div
              className="qty-btn-addon"
              onClick={() => handlePressButtonQuantity("+")}
            >
              <i className="icon-plus" />
            </div>
          </div>
          {error && (
            <div style={{ color: "red", fontSize: 12, marginTop: 5 }}>
              {error}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default AddonItem;
