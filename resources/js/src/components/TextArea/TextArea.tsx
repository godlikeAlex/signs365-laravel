import { InputHTMLAttributes } from "react";

import classes from "./TextArea.module.scss";
import classNames from "classnames";

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function TextArea({ className, label, ...props }: Props) {
  return (
    <label className={classes.textAreaWrapper}>
      {label || null}
      <textarea
        className={classNames(classes.textArea, className)}
        {...props}
      ></textarea>
    </label>
  );
}
