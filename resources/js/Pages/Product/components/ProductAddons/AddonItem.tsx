import classNames from "classnames";
import React, { MouseEventHandler } from "react";

import "./style-addons.css";
import { useAppDispatch, useAppSelector } from "@/src/hooks";
import {
  AddonWithExtraFields,
  handleAddonChange,
  updateAddonQuantity,
} from "@/src/redux/singleProductSlice";
import { Addon } from "@/src/types/ProductModel";
import ExtraDataSelect from "./ExtraDataSelect";
import { useProductContext } from "@/src/contexts/MainProductContext";
import {
  ProductActionKind,
  SelectedAddon,
} from "@/src/reducers/ProductReducer";

import classes from "./ProductAddons.module.scss";

interface Props {
  addon: Addon;
  disabled: boolean;
}

const AddonItem: React.FC<Props> = ({ addon, disabled }: Props) => {
  const { state, dispatch } = useProductContext();
  const { selectedAddons } = state;
  const selectedAddon = selectedAddons.find((a) => addon.id === a.id);

  const { withQuantity, title } = addon;

  const AddonTag = addon.extra_data_type === "unset" ? "button" : "div";

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (selectedAddon) {
      return dispatch({
        type: ProductActionKind.REMOVE_ADDON,
        payload: { id: addon.id },
      });
    }

    dispatch({ type: ProductActionKind.SELECT_ADDON, payload: { addon } });
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let currentValue = +value;

    if (disabled) return;

    if (!addon.withQuantity) {
      return;
    }

    const maxQty = addon.validation["max-qty"];
    const minQty = addon.validation["min-qty"];

    if (currentValue < minQty || !value) {
      dispatch({
        type: ProductActionKind.SET_ERROR_TO_ADDON,
        payload: {
          selectedAddonID: addon.id,
          error: `The minimum quantity must be ${minQty}.`,
        },
      });
    } else if (currentValue > maxQty) {
      dispatch({
        type: ProductActionKind.SET_ERROR_TO_ADDON,
        payload: {
          selectedAddonID: addon.id,
          error: `The maximum quantity must be ${maxQty}.`,
        },
      });
    } else {
      dispatch({
        type: ProductActionKind.SET_ERROR_TO_ADDON,
        payload: {
          selectedAddonID: addon.id,
          error: undefined,
        },
      });
    }

    dispatch({
      type: ProductActionKind.CHANGE_ADDON_QUANTITY,
      payload: {
        selectedAddonID: selectedAddon.id,
        quantity: Number.isNaN(currentValue)
          ? selectedAddon.quantity
          : currentValue,
      },
    });
  };

  const handlePressButtonQuantity = (type: "+" | "-") => {
    if (!selectedAddon.withQuantity) return;

    const maxQty = selectedAddon.validation["max-qty"];
    const minQty = selectedAddon.validation["min-qty"];

    const increasedQuantity = Math.min(selectedAddon.quantity + 1, maxQty);

    const decreasedQuantity = Math.max(selectedAddon.quantity - 1, minQty);

    dispatch({
      type: ProductActionKind.CHANGE_ADDON_QUANTITY,
      payload: {
        selectedAddonID: selectedAddon.id,
        quantity: type === "+" ? increasedQuantity : decreasedQuantity,
      },
    });
  };

  return (
    <AddonTag
      className={classNames(classes.addon, {
        [classes.addonActive]: Boolean(selectedAddon),
        [classes.addonToggler]: addon.extra_data_type === "unset",
        [classes.addonWithQuantity]: withQuantity,
        [classes.addonDisabled]: disabled,
      })}
      onClick={(e) => AddonTag === "button" && handleClick(e)}
      disabled={disabled}
    >
      <h6 className={classes.addonTitle}>
        {title}

        {withQuantity && selectedAddon ? (
          <div>
            <div className={classes.quantityAddonContainer}>
              <div
                className={classes.quantityAddonButton}
                onClick={() => handlePressButtonQuantity("-")}
              >
                <i className="icon-minus" />
              </div>
              <input
                className={classes.quantityAddonInput}
                value={selectedAddon.quantity}
                min={addon.validation["min-qty"]}
                max={addon.validation["max-qty"]}
                onChange={handleChangeQuantity}
              />
              <div
                className={classes.quantityAddonButton}
                onClick={() => handlePressButtonQuantity("+")}
              >
                <i className="icon-plus" />
              </div>
            </div>
            {selectedAddon.error && (
              <div style={{ color: "red", fontSize: 12, marginTop: 5 }}>
                {selectedAddon.error}
              </div>
            )}
          </div>
        ) : null}
      </h6>

      {addon.extra_data_type !== "unset" && (
        <ExtraDataSelect addon={addon} type={addon.extra_data_type} />
      )}
    </AddonTag>
  );
};

export default AddonItem;
