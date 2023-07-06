import React, { useContext } from "react";
import Input from "../Input";
import { ProductFormContext } from "@/src/contexts/ProductFormContext";
import classNames from "classnames";

interface Props {}

const units: Array<"inches" | "feet"> = ["inches", "feet"];

const ProductCalculator: React.FC<Props> = ({}: Props) => {
  const { state, setState } = useContext(ProductFormContext);

  const handleChange = (input: "width" | "height", value: string) => {
    setState((state) => ({
      ...state,
      [input]: { ...state[input], value },
    }));
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
            <div className="ps-form--review" style={{ marginBottom: 0 }}>
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
