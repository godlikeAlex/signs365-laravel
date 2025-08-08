import { ICategory } from "@/src/types/models";
import { Link, usePage } from "@inertiajs/react";
import classNames from "classnames";
import { useState } from "react";
import BadgeCategory from "../BadgeCategory";
import { SharedInertiaData } from "@/src/types/inertiaTypes";

import classes from "./Header.module.scss";

interface Props extends ICategory {}

export default function HeaderCategoryItem({
  title,
  slug,
  colors,
  icon,
}: Props) {
  const pageData = usePage<SharedInertiaData>();

  const [hovered, setHovered] = useState(false);

  const isActivePage = pageData.url.startsWith(`/shop/${slug}`);

  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={classNames(classes.navCategoryItem, {
        [classes.navCategoryItemActive]: isActivePage,
      })}
      style={{
        ["--primaryCategoryColor" as string]: colors.primary,
        ["--alternativeCategoryColor" as string]: colors.alternative,
      }}
    >
      <Link
        href={`/shop/${slug}`}
        className={classNames("category-menu-item__link")}
      >
        <img
          src={`/storage/${icon}`}
          alt={title}
          style={{ width: "25px", height: "25px" }}
        />
        <div className={classes.navCategoryItemTitle}>
          <BadgeCategory
            active={isActivePage || hovered}
            primaryColor={colors.primary}
            alternativeColor={colors.alternative}
          >
            {title}
          </BadgeCategory>
        </div>
      </Link>
    </li>
  );
}
