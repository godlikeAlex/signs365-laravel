import React from "react";
import RSelect from "react-select";

type Props = {
  size?: "sm" | "md";
} & React.ComponentProps<typeof RSelect>;

const stylesBySize = {
  sm: { height: "25px", fontSize: "13px" },
  md: { height: "46px", fontSize: "16px" },
};

export default function Select({ size = "md", ...props }: Props) {
  const styles = stylesBySize[size];

  return (
    <RSelect
      styles={{
        indicatorSeparator: (base, props) => ({
          display: "none",
        }),
        control: (baseStyles, dropDownState) => ({
          ...baseStyles,
          borderColor: dropDownState.isFocused ? "#FFCA1A" : "#EAE9E5",
          boxShadow: "unset",
          height: styles.height,
          borderRadius: "40px",
          backgroundColor: "#EAE9E5",
          color: "#595855",
          paddingLeft: 12,
          paddingRight: 12,
          fontSize: styles.fontSize,

          ":hover": {
            borderColor: "#FFCA1A",
          },
        }),
        menuList: (base) => ({
          ...base,
          background: "#f0f2f5",
          color: "5b6c8f",
          fontSize: styles.fontSize,
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
      {...props}
    />
  );
}
