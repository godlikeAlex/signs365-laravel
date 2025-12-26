import {
  CategoryWithProductCards,
  ICategory,
  IProductCard,
} from "@/src/types/models";
import { Link, usePage } from "@inertiajs/react";
import classNames from "classnames";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import BadgeCategory from "../BadgeCategory";
import { SharedInertiaData } from "@/src/types/inertiaTypes";
import placeholderImagePath from "@/assets/images/placeholder.webp";

import classes from "./Header.module.scss";

interface Props extends CategoryWithProductCards {}

export default function HeaderCategoryItem({
  title,
  slug,
  colors,
  products,
  icon,
}: Props) {
  const pageData = usePage<SharedInertiaData>();
  const submenuRef = useRef<HTMLDivElement>();
  const [hovered, setHovered] = useState(false);
  const isActivePage = pageData.url.startsWith(`/shop/${slug}`);

  useLayoutEffect(() => {
    const submenuElement = submenuRef.current;
    const windowWidth = document.documentElement.clientWidth;

    const bounding = submenuElement.getBoundingClientRect();
    const offScreen = windowWidth - bounding.right;

    if (offScreen <= 0) {
      submenuElement.style.left = `${windowWidth - bounding.right}px`;
    }
  }, []);

  const [activeProduct, setActiveProduct] = useState<IProductCard>(null);

  const images = activeProduct
    ? activeProduct.images.filter((image) => !image.path.endsWith(".mp4"))
    : [];

  const activeImage = activeProduct
    ? `/storage/${images[0]?.path}`
    : placeholderImagePath;

  const handleHoverProduct = (product: IProductCard) =>
    setActiveProduct(product);

  return (
    <li
      onMouseEnter={() => {
        handleHoverProduct(products[0]);
        setHovered(true);
      }}
      onMouseLeave={() => {
        handleHoverProduct(products[0]);
        setHovered(false);
      }}
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
        className={classes.categoryLink}
        // className={classNames("category-menu-item__link")}
      >
        {title}
      </Link>

      <div className={classes.navDropdown} ref={submenuRef}>
        <ul className={classes.navDropdownList}>
          {products.map((product) => (
            <li key={product.id} className={classes.navDropdownNavItem}>
              <Link
                href={`/shop/${product.categories[0].slug}/${product.slug}`}
                className={classes.navDropdownNavLink}
                onMouseEnter={() => handleHoverProduct(product)}
              >
                {product.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className={classes.navDropdownImage}>
          <Link
            href={`/shop/${activeProduct?.categories[0].slug}/${activeProduct?.slug}`}
          >
            <img src={activeImage} />
          </Link>
          <Link
            href={`/shop/${activeProduct?.categories[0].slug}/${activeProduct?.slug}`}
          >
            <h5>{activeProduct?.title}</h5>
          </Link>
        </div>
      </div>
    </li>
  );
}
