import classNames from "classnames";
import { PropsWithChildren } from "react";
import classes from "./BadgeCategory.module.scss";

type Props<T extends React.ElementType> = {
  primaryColor: string;
  alternativeColor: string;
  active?: boolean;
  component?: T;
} & React.ComponentPropsWithoutRef<T>;

export default function BadgeCategory<T extends React.ElementType = "div">({
  primaryColor,
  alternativeColor,
  active = false,
  component,
  children,
  ...props
}: PropsWithChildren<Props<T>>) {
  const Component = component ?? "div";

  return (
    <Component
      {...props}
      className={classNames(classes.badgeCategory, {
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
