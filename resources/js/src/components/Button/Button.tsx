import { ButtonHTMLAttributes, PropsWithChildren } from "react";

import classes from "./Button.module.scss";
import classNames from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "primary";
  color?: "primary" | "primary-600" | "primary-300";
  active?: boolean;
}

export default function Button({
  children,
  active = false,
  variant = "primary",
  color = "primary",
  className,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <button
      className={classNames(
        classes.button,
        {
          [classes.buttonActive]: active,
          [classes.buttonPrimary600]:
            variant === "primary" && color === "primary-600",
          [classes.buttonGhost300]:
            variant === "ghost" && color === "primary-300",
          [classes.buttonPrimary]: variant === "primary" && color === "primary",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
