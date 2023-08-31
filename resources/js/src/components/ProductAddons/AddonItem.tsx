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
    let currentValue = +value;

    if (disabled) return;

    if (addon.withQuantity) {
      if (currentValue >= addon.validation["max-qty"]) {
        currentValue = addon.validation["max-qty"];
      }

      if (currentValue <= addon.validation["min-qty"]) {
        currentValue = addon.validation["min-qty"];
      }
    }

    dispatch(
      updateAddonQuantity({ addonID: addon.id, quantity: currentValue })
    );
  };

  const handlePressButtonQuantity = (type: "+" | "-") => {
    if (!addon.withQuantity) return;

    const increasedQuantity =
      addon.quantity + 1 >= addon.validation["max-qty"]
        ? addon.validation["max-qty"]
        : addon.quantity + 1;

    const decreasedQuantity =
      addon.quantity - 1 <= addon.validation["min-qty"]
        ? addon.validation["min-qty"]
        : addon.quantity - 1;

    dispatch(
      updateAddonQuantity({
        addonID: addon.id,
        quantity: type === "+" ? increasedQuantity : decreasedQuantity,
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
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <h6 className="can-toggle">{title}</h6>

      {withQuantity && isSelected ? (
        <div className="can-toggle">
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
