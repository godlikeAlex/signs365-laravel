import { Link } from "@inertiajs/react";
import BadgeCategory from "../BadgeCategory";

import StarSVG from "@/assets/icons/star.svg?react";
import { IProductCard } from "@/src/types/models";

import classes from "./ProductCard.module.scss";

type Props = IProductCard & {};

export default function ProductCard({
  title,
  slug,
  images,
  categories,
  min_price,
}: Props) {
  const [image] = images;
  const [category] = categories;

  const pathToProduct = `/shop/${category.slug}/${slug}`;

  return (
    <article className={classes.productCard}>
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
          src={`/storage/${image.thumbnail ? image.thumbnail : image.path}`}
          alt={image.alt ? image.alt : title}
        />
      </Link>

      <Link href={pathToProduct}>
        <h3 className={classes.productCardTitle}>{title}</h3>
      </Link>

      {category ? (
        <BadgeCategory
          component={Link}
          href={`/shop/${category.slug}`}
          primaryColor={category.colors.primary}
          alternativeColor={category.colors.alternative}
        >
          {category.title}
        </BadgeCategory>
      ) : null}

      <div className={classes.ratingContainer}>
        {new Array(5).fill("").map(() => (
          <StarSVG width={15} height={15} />
        ))}
      </div>

      {min_price && (
        <div className={classes.productCardPrice}>
          From <span>{min_price.toLocaleString()}$</span>
        </div>
      )}
    </article>
  );
}
