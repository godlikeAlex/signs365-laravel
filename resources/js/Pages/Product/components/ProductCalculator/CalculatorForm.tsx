import React, { useContext, useEffect, useState } from "react";
import { ProductFormContext } from "@/src/contexts/ProductFormContext";
import { useAppSelector } from "@/src/hooks";
import { BaseInput, Input } from "@/src/components";
import { useProductContext } from "@/src/contexts/MainProductContext";
import { ProductActionKind } from "@/src/reducers/ProductReducer";

import classes from "./ProductCalculator.module.scss";

interface Props {
  staticData?: {
    static_width: string;
    static_height: string;
  };
  disabled: boolean;
}

const CalculatorForm: React.FC<Props> = ({ staticData, disabled }: Props) => {
  const { state, dispatch } = useProductContext();

  const handleChange = (input: "width" | "height", value: string) => {
    const regex = /^[0-9\b]+$/;

    if (regex.test(value) || value === "") {
      const numberValue = Number(value);
      const maxInput = Number(state.selectedOption.validation[`max_${input}`]);

      if (maxInput > 0 && numberValue > maxInput) {
        return dispatch({
          type: ProductActionKind.UPDATE_INPUT,
          payload: {
            input,
            value: isNaN(numberValue) ? 1 : numberValue,
            error: `The maximum number for ${input} should be ${maxInput}`,
          },
        });
      }

      dispatch({
        type: ProductActionKind.UPDATE_INPUT,
        payload: {
          input,
          value: isNaN(numberValue) ? 1 : numberValue,
          error: undefined,
        },
      });
    }
  };

  const handleOnBlur = (input: "width" | "height", currentValue: string) => {
    const maxInput = Number(state.selectedOption.validation[`max_${input}`]);

    if (!currentValue || Number(currentValue) <= 0) {
      return handleChange(input, "1");
    }

    if (+currentValue > maxInput) {
      return handleChange(input, maxInput.toString());
    }
  };

  return (
    <form>
      <div className={classes.inputSizeRow}>
        <BaseInput
          type="text"
          onChange={(e) => handleChange("width", e.target.value)}
          value={staticData ? staticData.static_width : state.width.value}
          disabled={disabled || staticData !== undefined}
          label="Width"
        />

        <BaseInput
          type="text"
          value={staticData ? staticData.static_height : state.height.value}
          onChange={(e) => handleChange("height", e.target.value)}
          disabled={disabled || staticData !== undefined}
          label="Height"
        />
      </div>

      {state.width.error ? (
        <div className="mt-20 text-danger">{state.width.error}</div>
      ) : null}

      {state.height.error ? (
        <div className="mt-20 text-danger">{state.height.error}</div>
      ) : null}
    </form>
  );
};

export default CalculatorForm;
