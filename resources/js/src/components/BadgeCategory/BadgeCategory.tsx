import classNames from "classnames";
import { PropsWithChildren } from "react";
import classes from "./BadgeCategory.module.scss";

type Props<T extends React.ElementType> = {
  primaryColor: string;
  alternativeColor: string;
  format?: "sm" | "lg";
  active?: boolean;
  component?: T;
} & React.ComponentPropsWithoutRef<T>;

const sizeClasses = {
  sm: classes.badgeCategorySm,
  lg: classes.badgeCategoryLg,
};

export default function BadgeCategory<T extends React.ElementType = "div">({
  primaryColor,
  alternativeColor,
  active = false,
  component,
  children,
  format = "sm",
  ...props
}: PropsWithChildren<Props<T>>) {
  const Component = component ?? "div";

  return (
    <Component
      {...props}
      className={classNames(classes.badgeCategory, sizeClasses[format], {
        [classes.badgeCategoryActive]: active,
      })}
      style={{
        ["--primaryCategoryColor" as string]: primaryColor,
        ["--alternativeCategoryColor" as string]: alternativeColor,
      }}
    >
      {children}
    </Component>
  );
}
