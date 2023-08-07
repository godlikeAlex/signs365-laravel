import classNames from "classnames";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: any;
  formType: "checkout" | "profile";
  label?: string;
}

const Input: React.FC<Props> = React.forwardRef<HTMLInputElement, Props>(
  ({ formType, ...props }, ref) => {
    return (
      <div
        className={classNames({
          "ps-checkout__group": formType === "checkout",
          "ps-form__group": formType === "profile",
        })}
      >
        {props.label ? (
          <label
            className={classNames({
              "ps-checkout__label": formType === "checkout",
              "ps-form__label": formType === "profile",
            })}
          >
            {props.label}
          </label>
        ) : null}

        <input
          type={props.type || "text"}
          ref={ref}
          className={classNames({
            "ps-input": formType === "checkout",
            "form-control ps-form__input": formType === "profile",
          })}
          {...props}
        />

        {props.error ? (
          <p
            style={{
              textTransform: "capitalize",
              color: "#ff5252",
              fontSize: 12,
              marginTop: 8,
            }}
          >
            {props.error}
          </p>
        ) : null}
      </div>
    );
  }
);

export default Input;
