import React, { useContext, useState } from "react";
import Input from "../Input";
import {
  ContextType,
  ProductFormContext,
} from "@/src/contexts/ProductFormContext";
import classNames from "classnames";
import { useAppSelector } from "@/src/hooks";
import UnitSelection from "./UnitSelection";
import CalculatorForm from "./CalculatorForm";
import CustomSizesDropdown from "./CustomSizesDropdown";
import Skeleton from "react-loading-skeleton";

interface Props extends ContextType {}

const units: Array<"inches" | "feet"> = ["inches", "feet"];

const ProductCalculator: React.FC<Props> = ({
  state,
  setState,
  validationRules,
}: Props) => {
  const { selectedOption } = useAppSelector((state) => state.product);

  const staticData = React.useMemo(() => {
    const isSignleType = selectedOption.type === "single";

    if (isSignleType) {
      return selectedOption.show_custom_sizes === false &&
        selectedOption.size_for_collect
        ? selectedOption.common_data
        : undefined;
    }

    return undefined;
  }, [selectedOption]);

  const hasCustomSize = React.useMemo(() => {
    if (selectedOption.type === "sqft") return false;

    return selectedOption.size_for_collect && selectedOption.show_custom_sizes;
  }, [selectedOption]);

  const handleSizeTypeSelect = (type: "default" | "custom") => {
    setState((state) => ({
      ...state,
      typeSizeSelection: type,
      customSize: { value: undefined, error: undefined },
    }));
  };

  return (
    <div className="ps-checkout">
      <div className="container">
        <div className="row">
          <div style={{ width: "100%" }}>
            <h6>Sizes:</h6>
          </div>
        </div>

        {selectedOption.show_custom_sizes && (
          <div className="row">
            <div
              className={classNames("product-variant", {
                "active-variant": state.typeSizeSelection === "default",
                "disabled-variant": state.disabled,
              })}
              onClick={() => !state.disabled && handleSizeTypeSelect("default")}
            >
              <h6 style={{ textTransform: "capitalize" }}>Default</h6>
            </div>

            <div
              className={classNames("product-variant", {
                "active-variant": state.typeSizeSelection === "custom",
                "disabled-variant": state.disabled,
              })}
              onClick={() => !state.disabled && handleSizeTypeSelect("custom")}
            >
              <h6 style={{ textTransform: "capitalize" }}>Custom</h6>
            </div>
          </div>
        )}

        {!staticData && !hasCustomSize ? (
          <UnitSelection
            currentUnit={state.unit}
            units={units}
            disabled={state.disabled}
            setUnit={(unit) => setState((state) => ({ ...state, unit }))}
          />
        ) : undefined}

        {state.typeSizeSelection === "custom" ? (
          <CalculatorForm staticData={staticData} />
        ) : null}

        {state.typeSizeSelection === "default" &&
        selectedOption.type !== "sqft" ? (
          <CustomSizesDropdown
            sizes={selectedOption.customSizes}
            hasError={state.highlightErrors && !validationRules["customSize"]}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProductCalculator;
