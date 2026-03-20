import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";
import styles from "./ToggleButton.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export default function ToggleButton({
  children,
  isActive,
  className,
  ...props
}: Props) {
  return (
    <button
      type="button"
      className={classNames(
        className,
        styles.toggleButton,
        isActive && styles.toggleButtonActive
      )}
      {...props}
    >
      {children}
    </button>
  );
}
