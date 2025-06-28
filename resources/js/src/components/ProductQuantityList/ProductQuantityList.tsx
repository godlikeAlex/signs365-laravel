import { useProductContext } from "@/src/contexts/MainProductContext";
import { IQuantityListItem } from "@/src/types/ProductModel";
import React from "react";
import Select from "react-select";

interface Props {
  quantityList: IQuantityListItem[];
  handleChange: (quantity: number) => void;
}

const ProductQuantityList: React.FC<Props> = ({
  quantityList,
  handleChange,
}: Props) => {
  const { state, dispatch } = useProductContext();

  const options = React.useMemo(() => {
    return quantityList.map((quantityItem) => ({
      value: quantityItem.quantity,
      label: quantityItem.label,
    }));
  }, [quantityList]);

  return (
    <div style={{ marginTop: 8, marginBottom: 20 }}>
      <Select
        maxMenuHeight={220}
        isSearchable
        menuPlacement="auto"
        options={options}
        onChange={(e) => handleChange(e.value)}
        value={options.find((option) => option.value === state.quantity.value)}
        styles={{
          control: (baseStyles, dropDownState) => ({
            ...baseStyles,
            borderColor:
              state.quantity.showError && state.quantity.error
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
              state.isSelected || state.isFocused ? "#fd8d27" : "#f0f2f5",
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
  );
};

export default ProductQuantityList;
