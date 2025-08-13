import { InputHTMLAttributes } from "react";
import classNames from "classnames";

import classes from "./BaseInput.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function BaseInput({ className, label, ...props }: Props) {
  return (
    <label className={classes.baseInputWrapper}>
      {label}
      <input className={classNames(classes.baseInput, className)} {...props} />
    </label>
  );
}
