import {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
} from "react";

import classes from "./Button.module.scss";
import classNames from "classnames";

interface BaseProps {
  variant?: "ghost" | "primary";
  color?: "primary" | "primary-600" | "primary-300" | "black";
  active?: boolean;
}

type PolymorphicComponentProps<C extends ElementType> = BaseProps &
  ComponentPropsWithoutRef<C> & {
    component?: C;
  };

export default function Button<C extends ElementType = "button">({
  children,
  active = false,
  variant = "primary",
  color = "primary",
  className,
  component,
  ...props
}: PropsWithChildren<PolymorphicComponentProps<C>>) {
  const Component = component || "button";

  return (
    <Component
      className={classNames(
        classes.button,
        {
          [classes.buttonActive]: active,
          [classes.buttonPrimary600]:
            variant === "primary" && color === "primary-600",
          [classes.buttonGhost300]:
            variant === "ghost" && color === "primary-300",
          [classes.buttonBlack]: variant === "primary" && color === "black",
          [classes.buttonPrimary]: variant === "primary" && color === "primary",
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
