import React from "react";
import RSelect from "react-select";

type Props = {
  size?: "sm" | "md";
  error?: boolean;
} & React.ComponentProps<typeof RSelect>;

const stylesBySize = {
  sm: { height: "25px", fontSize: "13px" },
  md: { height: "46px", fontSize: "16px" },
};

export default function Select({ size = "md", error = false, ...props }: Props) {
  const styles = stylesBySize[size];
  const errorColor = "rgb(220, 48, 48)";

  return (
    <RSelect
      styles={{
        indicatorSeparator: (base, props) => ({
          display: "none",
        }),
        control: (baseStyles, dropDownState) => ({
          ...baseStyles,
          borderColor: error
            ? errorColor
            : dropDownState.isFocused
            ? "#FFCA1A"
            : "#EAE9E5",
          boxShadow: "unset",
          height: styles.height,
          borderRadius: "40px",
          backgroundColor: "#EAE9E5",
          color: "#595855",
          paddingLeft: 12,
          paddingRight: 12,
          fontSize: styles.fontSize,

          ":hover": {
            borderColor: error ? errorColor : "#FFCA1A",
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
        multiValue: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "#FFCA19",
        }),
        multiValueLabel: (baseStyles) => ({
          ...baseStyles,
          color: "white",
        }),
        multiValueRemove: (baseStyles) => ({
          ...baseStyles,
          color: "white",
          ":hover": {
            backgroundColor: "#666666",
            color: "white",
          },
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: error ? errorColor : "#595855",
        }),
        placeholder: (baseStyle) => ({
          ...baseStyle,
          color: error ? errorColor : "#595855",
        }),
      }}
      {...props}
    />
  );
}
