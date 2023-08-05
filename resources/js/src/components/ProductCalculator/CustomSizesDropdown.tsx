import { ProductFormContext } from "@/src/contexts/ProductFormContext";
import { CustomSize } from "@/src/types/ProductModel";
import React, { useContext } from "react";
import Select from "react-select";

interface Props {
  sizes: CustomSize[];
  hasError: boolean;
}

const CustomSizesDropdown: React.FC<Props> = ({ sizes, hasError }: Props) => {
  const { state, setState } = useContext(ProductFormContext);

  const options = React.useMemo(() => {
    return sizes.map((size) => ({ value: size.id, label: size.label }));
  }, [sizes]);

  return (
    <div className="row">
      <form style={{ width: "100%", marginTop: 10 }}>
        <div
          className="ps-form--review ps-form-calculator"
          style={{ marginBottom: 0 }}
        >
          <div className="row">
            <div className="col-md-12">
              <div className={"ps-checkout__group"}>
                <label className={"ps-checkout__label"}>Adjusted size</label>
                <Select
                  options={options}
                  onChange={(e) =>
                    setState((state) => ({
                      ...state,
                      customSize: { ...state.customSize, value: e.value },
                    }))
                  }
                  value={options.find(
                    (option) => option.value === state.customSize.value
                  )}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: hasError
                        ? "red"
                        : state.isFocused
                        ? "#fd8d27"
                        : "#f0f2f5",
                      boxShadow: "unset",
                      height: "46px",
                      borderRadius: "40px",
                      backgroundColor: "#f0f2f5",
                      color: "#5b6c8f",
                      paddingLeft: 12,
                      paddingRight: 12,

                      ":hover": {
                        borderColor: "#fd8d27",
                      },
                    }),
                    menuList: () => ({
                      background: "#f0f2f5",
                      color: "5b6c8f",
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      color:
                        state.isSelected || state.isFocused
                          ? "white"
                          : "#5b6c8f",
                      background:
                        state.isSelected || state.isFocused
                          ? "#fd8d27"
                          : "#f0f2f5",
                    }),
                    singleValue: (baseStyles) => ({
                      ...baseStyles,
                      color: "#5b6c8f",
                    }),
                    placeholder: (baseStyle) => ({
                      ...baseStyle,
                      color: "#5b6c8f",
                    }),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomSizesDropdown;
