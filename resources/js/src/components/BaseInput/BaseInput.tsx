import React, {
  ComponentPropsWithRef,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import classNames from "classnames";

import classes from "./BaseInput.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  wrapperClass?: string;
}

const BaseInput = forwardRef<HTMLInputElement, Props>(function (
  { className, label, error = false, wrapperClass, ...props },
  ref
) {
  return (
    <label className={classNames(classes.baseInputWrapper, wrapperClass)}>
      {label}
      <input
        ref={ref}
        className={classNames(
          classes.baseInput,
          { [classes.baseInputError]: error },
          className
        )}
        {...props}
      />
    </label>
  );
});

export default BaseInput;
