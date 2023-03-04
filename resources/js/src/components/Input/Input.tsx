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
          "ps-form__group": props.formType === "profile",
        })}
      >
        {props.label ? (
          <label
            className={classNames({
              "ps-checkout__label": props.formType === "checkout",
              "ps-form__label": props.formType === "profile",
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
            "form-control ps-form__input": props.formType === "profile",
          })}
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
