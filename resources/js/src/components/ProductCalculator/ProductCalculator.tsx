import React from "react";
import classNames from "classnames";
import UnitSelection from "./UnitSelection";
import CalculatorForm from "./CalculatorForm";
import CustomSizesDropdown from "./CustomSizesDropdown";
import { useProductContext } from "@/src/contexts/MainProductContext";
import { ProductOption } from "@/src/types/ProductModel";
import { ProductActionKind } from "@/src/reducers/ProductReducer";

interface Props {
  selectedOption: ProductOption;
}

const units: Array<"inches" | "feet"> = ["inches", "feet"];

const ProductCalculator: React.FC<Props> = ({ selectedOption }: Props) => {
  const { dispatch, state } = useProductContext();
  const disabled = state.status === "fetching";

  const staticData = React.useMemo(() => {
    const hasStaticData = selectedOption.type !== "sqft";

    if (hasStaticData) {
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
    dispatch({
      type: ProductActionKind.SET_SIZE_SELECTION_TYPE,
      payload: {
        type,
      },
    });
  };

  return (
    <div className="ps-checkout">
      <div className="container">
        <div className="row">
          <div style={{ width: "100%" }}>
            <h6>Sizes:</h6>
          </div>
        </div>

        {selectedOption.show_custom_sizes &&
        selectedOption.prevent_user_input_size === false ? (
          <div className="row">
            <div
              className={classNames("product-variant", {
                "active-variant": state.sizeSelectionType === "default",
                "disabled-variant": disabled,
              })}
              onClick={() => !disabled && handleSizeTypeSelect("default")}
            >
              <h6 style={{ textTransform: "capitalize" }}>Default </h6>
            </div>

            <div
              className={classNames("product-variant", {
                "active-variant": state.sizeSelectionType === "custom",
                "disabled-variant": disabled,
              })}
              onClick={() => !disabled && handleSizeTypeSelect("custom")}
            >
              <h6 style={{ textTransform: "capitalize" }}>Custom</h6>
            </div>
          </div>
        ) : null}

        {!staticData && !hasCustomSize ? (
          <UnitSelection
            currentUnit={state.unit}
            units={units}
            disabled={disabled}
            setUnit={(unit) =>
              dispatch({
                type: ProductActionKind.CHANGE_UNIT,
                payload: { unit },
              })
            }
          />
        ) : undefined}

        {state.sizeSelectionType === "custom" ? (
          <CalculatorForm staticData={staticData} disabled={disabled} />
        ) : null}

        {state.sizeSelectionType === "default" &&
        selectedOption.type !== "sqft" ? (
          <CustomSizesDropdown
            sizes={selectedOption.customSizes}
            hasError={false}
            // hasError={state.highlightErrors && !validationRules["customSize"]}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProductCalculator;
