import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";
import styles from "./ToggleButton.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  appearance?: "colored" | "white";
  apperance?: "colored" | "white";
}

export default function ToggleButton({
  children,
  isActive,
  className,
  appearance,
  apperance,
  ...props
}: Props) {
  const resolvedAppearance = appearance ?? apperance ?? "white";

  return (
    <button
      type="button"
      className={classNames(
        className,
        styles.toggleButton,
        resolvedAppearance === "colored" && styles.toggleButtonColored,
        isActive && styles.toggleButtonActive
      )}
      {...props}
    >
      {children}
    </button>
  );
}
