import { Children, PropsWithChildren } from "react";
import BreadcrumbsItem from "./BreadcrumbsItem";

import BreadcrumbArrow from "@/assets/icons/bread-crumb-arrow.svg?react";

import classes from "./Breadcrumbs.module.scss";

function Breadcrumbs({ children }: PropsWithChildren) {
  return (
    <nav>
      <ul className={classes.breadcrumbs}>
        {Children.map(children, (child, index) => {
          const isLast = index + 1 == Children.count(children);

          return (
            <li>
              {child}
              {!isLast && (
                <span className={classes.breadcrumbsArrow}>
                  <BreadcrumbArrow />
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

Breadcrumbs.Item = BreadcrumbsItem;

export default Breadcrumbs;
