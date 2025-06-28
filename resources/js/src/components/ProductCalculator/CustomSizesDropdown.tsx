import { useProductContext } from "@/src/contexts/MainProductContext";
import { ProductActionKind } from "@/src/reducers/ProductReducer";
import { CustomSize } from "@/src/types/ProductModel";
import React from "react";
import Select from "react-select";

interface Props {
  sizes: CustomSize[];
}

const CustomSizesDropdown: React.FC<Props> = ({ sizes }: Props) => {
  const { state, dispatch } = useProductContext();

  const options = React.useMemo(() => {
    return sizes.map((size) => ({
      value: size.id,
      label: size.label,
      width: size.width,
      height: size.height,
    }));
  }, [sizes]);

  const handleChange = (width: string, height: string, customSize: number) => {
    const convertedWidth = Number(width);
    const convertedHeight = Number(height);

    dispatch({
      type: ProductActionKind.SET_CUSTOM_SIZE,
      payload: {
        width: isNaN(convertedWidth) ? 1 : convertedWidth,
        height: isNaN(convertedHeight) ? 1 : convertedHeight,
        customSize,
      },
    });
  };

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
                <label className={"ps-checkout__label"}>Adjusted sizes</label>
                <Select
                  maxMenuHeight={220}
                  isSearchable
                  menuPlacement="auto"
                  options={options}
                  onChange={(e) => handleChange(e.width, e.height, e.value)}
                  value={options.find(
                    (option) => option.value === state.customSize.value
                  )}
                  styles={{
                    control: (baseStyles, dropDownState) => ({
                      ...baseStyles,
                      borderColor:
                        state.customSize.showError && state.customSize.error
                          ? "red"
                          : dropDownState.isFocused
                          ? "#fd8d27"
                          : "#f0f2f5",
                      boxShadow: "unset",
                      height: "46px",
                      borderRadius: "40px",
                      backgroundColor: "#f0f2f5",
                      color: "#595855",
                      paddingLeft: 12,
                      paddingRight: 12,

                      ":hover": {
                        borderColor: "#fd8d27",
                      },
                    }),
                    menuList: (base) => ({
                      ...base,
                      background: "#f0f2f5",
                      color: "5b6c8f",
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      color:
                        state.isSelected || state.isFocused
                          ? "white"
                          : "#595855",
                      background:
                        state.isSelected || state.isFocused
                          ? "#fd8d27"
                          : "#f0f2f5",
                    }),
                    singleValue: (baseStyles) => ({
                      ...baseStyles,
                      color: "#595855",
                    }),
                    placeholder: (baseStyle) => ({
                      ...baseStyle,
                      color: "#595855",
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
