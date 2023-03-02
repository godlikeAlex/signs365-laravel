import classNames from "classnames";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: any;
  formType: "checkout" | "profile";
  label?: string;
}

const Input: React.FC<Props> = React.forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    return (
      <div
        className={classNames({
          "ps-checkout__group": props.formType === "checkout",
        })}
      >
        {props.label ? (
          <label
            className={classNames({
              "ps-checkout__label": props.formType === "checkout",
            })}
          >
            {props.label}
          </label>
        ) : null}

        <input
          type="text"
          {...props}
          ref={ref}
          className={classNames({
            "ps-input": props.formType === "checkout",
          })}
        />

        {props.error ? (
          <p style={{ textTransform: "capitalize", color: "#ff5252" }}>
            {props.error}
          </p>
        ) : null}
      </div>
    );
  }
);

export default Input;
