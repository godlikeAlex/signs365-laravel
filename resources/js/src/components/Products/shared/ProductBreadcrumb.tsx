import { ICategory } from "@/src/types/models";
import { IProduct } from "@/src/types/ProductModel";
import { Link } from "@inertiajs/react";
import React from "react";

interface Props {
  categories: Pick<ICategory, "title" | "slug" | "id">[];
  productTitle: string;
}

const ProductBreadcrumb: React.FC<Props> = ({
  categories,
  productTitle,
}: Props) => {
  return (
    <ul className="ps-breadcrumb">
      <li className="ps-breadcrumb__item">
        <Link href="/">Home</Link>
      </li>
      <li className="ps-breadcrumb__item">
        <span>Shop</span>
      </li>
      {categories.length > 0 && (
        <li
          className="ps-breadcrumb__item"
          key={`breadcumbs-${categories[0].slug}`}
        >
          <Link href={`/shop/${categories[0].slug}`}>
            {categories[0].title}
          </Link>
        </li>
      )}

      <li className="ps-breadcrumb__item">
        <span>{productTitle}</span>
      </li>
    </ul>
  );
};

export default ProductBreadcrumb;
