import { Link } from "@inertiajs/react";
import BadgeCategory from "../BadgeCategory";
import Rating from "../Rating";

import { IProductCard } from "@/src/types/models";

import placeholderImagePath from "@/assets/images/placeholder.webp";

import classes from "./ProductCard.module.scss";
import classNames from "classnames";

type Props = IProductCard & {
  variant?: "home" | "catalog";
};

export default function ProductCard({
  title,
  slug,
  images,
  categories,
  min_price,
  short_description,
  variant = "home",
}: Props) {
  const [image] = images;
  const [category] = categories;

  const pathToProduct = `/shop/${category.slug}/${slug}`;

  const imageAlt = image ? image.alt ?? title : "";
  const imagePath = image
    ? `/storage/${image?.thumbnail ?? image.path}`
    : placeholderImagePath;

  return (
    <article
      className={classNames(classes.productCard, {
        [classes.productCardCatalog]: variant === "catalog",
      })}
    >
      <Link href={pathToProduct} className={classes.productCardImageContainer}>
        <div
          className={classes.productCardImageLink}
          style={{
            ["--link-color" as string]: category?.colors?.primary,
          }}
        >
          Customize
        </div>
        <img
          className={classes.productCardImage}
          src={imagePath}
          alt={imageAlt}
        />
      </Link>

      <div className={classes.productCardContent}>
        <Link href={pathToProduct}>
          <h3 className={classes.productCardTitle}>{title}</h3>
        </Link>

        {category && variant === "home" ? (
          <BadgeCategory
            component={Link}
            href={`/shop/${category.slug}`}
            primaryColor={category.colors.primary}
            alternativeColor={category.colors.alternative}
          >
            {category.title}
          </BadgeCategory>
        ) : null}

        {variant === "catalog" && (
          <p className={classes.productCardDescription}>{short_description}</p>
        )}

        <div className={classes.cardRating}>
          <Rating rating={5} size={variant === "home" ? "sm" : "md"} />
        </div>

        {min_price && (
          <div className={classes.productCardPrice}>
            From <span>{min_price.toLocaleString()}$</span>
          </div>
        )}
      </div>
    </article>
  );
}
