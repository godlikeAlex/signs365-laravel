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
    <form style={{ width: "100%", marginTop: 20 }}>
      <label style={{ fontSize: 15 }}>Adjusted sizes</label>
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
              state.quantity.showError && state.quantity.error
                ? "red"
                : dropDownState.isFocused
                ? "#FFCA1A"
                : "#FFCA1A",
            boxShadow: "unset",
            height: "46px",
            borderRadius: "40px",
            backgroundColor: "#EAE9E5",
            color: "#595855",
            paddingLeft: 12,
            paddingRight: 12,

            ":hover": {
              borderColor: "#FFCA1A",
            },
          }),
          menuList: (base) => ({
            ...base,
            background: "#f0f2f5",
            color: "5b6c8f",
            // zIndex: 99,
            // position: 'relative'
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9,
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            color: state.isSelected || state.isFocused ? "white" : "#595855",
            background:
              state.isSelected || state.isFocused ? "#FFCA1A" : "#f0f2f5",
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
    </form>
  );
};

export default CustomSizesDropdown;
