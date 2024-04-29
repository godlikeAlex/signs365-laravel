import { ProductFormContext } from "@/src/contexts/ProductFormContext";
import { useAppSelector } from "@/src/hooks";
import React, { useContext, useEffect, useState } from "react";
import Input from "../Input";

interface Props {
  staticData?: {
    static_width: string;
    static_height: string;
  };
}

const CalculatorForm: React.FC<Props> = ({ staticData }: Props) => {
  const { selectedOption } = useAppSelector((state) => state.product);
  const { state, setState } = useContext(ProductFormContext);

  const handleChange = (input: "width" | "height", value: string) => {
    const regex = /^[0-9\b]+$/;

    if (regex.test(value) || value === "") {
      setState((state) => ({
        ...state,
        [input]: { ...state[input], value },
      }));
    }
  };

  const handleOnBlur = (input: "width" | "height", currentValue: string) => {
    const maxInput = Number(selectedOption.validation[`max_${input}`]);

    if (!currentValue || Number(currentValue) <= 0) {
      return handleChange(input, "1");
    }

    if (+currentValue > maxInput) {
      return handleChange(input, maxInput.toString());
    }
  };

  return (
    <div className="row">
      <form style={{ width: "100%", marginTop: 10 }}>
        <div
          className="ps-form--review ps-form-calculator"
          style={{ marginBottom: 0 }}
        >
          <div className="row">
            <div className="col-md-6">
              <Input
                type="text"
                // disabled={isSubmitting}
                onChange={(e) => handleChange("width", e.target.value)}
                value={staticData ? staticData.static_width : state.width.value}
                formType={"checkout"}
                disabled={state.disabled || staticData !== undefined}
                label="Width"
                onBlur={(e) => handleOnBlur("width", e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <Input
                type="text"
                // disabled={isSubmitting}
                value={
                  staticData ? staticData.static_height : state.height.value
                }
                onChange={(e) => handleChange("height", e.target.value)}
                formType={"checkout"}
                disabled={state.disabled || staticData !== undefined}
                label="Height"
                onBlur={(e) => handleOnBlur("height", e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CalculatorForm;
