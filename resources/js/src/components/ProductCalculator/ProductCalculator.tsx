import React, { useContext } from "react";
import Input from "../Input";
import { ProductFormContext } from "@/src/contexts/ProductFormContext";
import classNames from "classnames";

interface Props {
  validation: { max_width: number; max_height: number };
}

const units: Array<"inches" | "feet"> = ["inches", "feet"];

const ProductCalculator: React.FC<Props> = ({ validation }: Props) => {
  const { state, setState } = useContext(ProductFormContext);

  const handleChange = (input: "width" | "height", value: any) => {
    const regex = /^[0-9\b]+$/;

    if (!regex.test(value)) {
      return;
    }

    setState((state) => ({
      ...state,
      [input]: { ...state[input], value },
    }));
  };

  const handleOnBlur = (input: "width" | "height", currentValue: string) => {
    if (validation[`max_${input}`] === 0) {
      return;
    }

    if (+currentValue > validation[`max_${input}`]) {
      handleChange(input, validation[`max_${input}`]);
    }
  };

  return (
    <div className="ps-checkout">
      <div className="container">
        <div className="row">
          <div style={{ width: "100%" }}>
            <h6 className="label-product-show">Sizes:</h6>
          </div>
          {units.map((unit) => (
            <div
              className={classNames("product-variant", {
                "active-variant": state.unit === unit,
                "disabled-variant": state.disabled,
              })}
              key={unit}
              onClick={() =>
                !state.disabled && setState((state) => ({ ...state, unit }))
              }
            >
              <h6 style={{ textTransform: "capitalize" }}>{unit}</h6>
            </div>
          ))}

          <form style={{ width: "100%", marginTop: 10 }}>
            <div
              className="ps-form--review ps-form-calculator"
              style={{ marginBottom: 0 }}
            >
              <div className="row">
                <div className="col-md-6">
                  <Input
                    type="number"
                    // disabled={isSubmitting}
                    onChange={(e) => handleChange("width", e.target.value)}
                    value={state.width.value}
                    formType={"checkout"}
                    disabled={state.disabled}
                    label="Width"
                    onBlur={(e) => handleOnBlur("width", e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <Input
                    type="number"
                    // disabled={isSubmitting}
                    onChange={(e) => handleChange("height", e.target.value)}
                    value={state.height.value}
                    formType={"checkout"}
                    disabled={state.disabled}
                    label="Height"
                    onBlur={(e) => handleOnBlur("height", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCalculator;
