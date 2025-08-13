import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

import classes from "./Breadcrumbs.module.scss";

type Props = {
  href?: string;
  color?: string;
};

export default function BreadcrumbsItem({
  href,
  color,
  children,
}: PropsWithChildren<Props>) {
  const Component = href ? Link : "span";

  return (
    <Component
      href={href}
      className={classes.breadcrumbsItem}
      style={{ color }}
    >
      {children}
    </Component>
  );
}
