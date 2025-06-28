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
  const [category] = categories || [];

  return (
    <ul className="ps-breadcrumb">
      <li className="ps-breadcrumb__item">
        <Link href="/">Home</Link>
      </li>
      <li className="ps-breadcrumb__item">
        <span>Shop</span>
      </li>
      {category && (
        <li className="ps-breadcrumb__item" key={`breadcumbs-${category.slug}`}>
          <Link href={`/shop/${category.slug}`}>{category.title}</Link>
        </li>
      )}

      <li className="ps-breadcrumb__item">
        <span className="primary-color">{productTitle}</span>
      </li>
    </ul>
  );
};

export default ProductBreadcrumb;
