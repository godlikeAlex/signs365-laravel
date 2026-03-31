import React from "react";
import classNames from "classnames";
import { Link } from "@inertiajs/react";
import { ICategory } from "@/src/types/models";

interface Props {
  categories: ICategory[];
  currentCategory: ICategory;
}

const getCategoryIconPath = (icon?: string): string | null => {
  if (!icon) {
    return null;
  }

  if (icon.startsWith("http://") || icon.startsWith("https://")) {
    return icon;
  }

  return icon.startsWith("/") ? icon : `/storage/${icon}`;
};

const CatalogCategoriesSidebar: React.FC<Props> = ({
  categories,
  currentCategory,
}: Props) => {
  return (
    <aside
      className="catalog-categories-sidebar"
      style={{ position: "sticky", top: 150 }}
    >
      <ul className="catalog-categories-sidebar__list">
        {categories.map((category) => {
          const isActive = currentCategory.id === category.id;
          const icon = isActive
            ? category.active_icon || category.icon
            : category.icon;
          const iconPath = getCategoryIconPath(icon);

          return (
            <li
              key={`catalog-category-${category.id}`}
              className={classNames("catalog-categories-sidebar__item", {
                active: isActive,
              })}
              style={
                {
                  "--category-primary": category.colors.primary,
                } as React.CSSProperties
              }
            >
              <Link
                href={`/shop/${category.slug}`}
                className="catalog-categories-sidebar__link"
              >
                <span className="catalog-categories-sidebar__label">
                  {iconPath && (
                    <img
                      src={iconPath}
                      alt={category.title}
                      className="catalog-categories-sidebar__icon"
                    />
                  )}
                  <span>{category.title}</span>
                </span>
                <i className="fa fa-chevron-right"></i>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default CatalogCategoriesSidebar;
