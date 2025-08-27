import React, {
  ComponentPropsWithRef,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import classNames from "classnames";

import classes from "./BaseInput.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const BaseInput = forwardRef<HTMLInputElement, Props>(function (
  { className, label, ...props },
  ref
) {
  return (
    <label className={classes.baseInputWrapper}>
      {label}
      <input
        ref={ref}
        className={classNames(classes.baseInput, className)}
        {...props}
      />
    </label>
  );
});

export default BaseInput;
