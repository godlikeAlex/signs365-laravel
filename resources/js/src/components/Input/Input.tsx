import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: any;
}

const Input: React.FC<Props> = React.forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    return (
      <div>
        <input {...props} ref={ref} />
        {props.error ? (
          <p style={{ textTransform: "capitalize" }}>{props.error}</p>
        ) : null}
      </div>
    );
  }
);

export default Input;
