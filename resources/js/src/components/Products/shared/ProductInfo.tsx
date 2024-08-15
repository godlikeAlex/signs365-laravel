import { ICategory } from "@/src/types/models";
import { Link } from "@inertiajs/react";
import React from "react";

interface Props {
  productTitle: string;
  categories: Pick<ICategory, "title" | "slug" | "id">[];
  productDescription: string;
}

const ProductInfo: React.FC<Props> = ({
  productTitle,
  categories,
  productDescription,
}: Props) => {
  return (
    <>
      <div className="ps-product__branch">
        {categories.map((category) => (
          <Link href={`/shop/${category.slug}`} key={`cat-${category.slug}`}>
            {category.title}
          </Link>
        ))}
      </div>
      <div className="ps-product__title">
        <a>{productTitle}</a>
      </div>
      <div className="ps-product__desc">
        <p
          className={"product_modal_desc"}
          dangerouslySetInnerHTML={{
            __html: productDescription,
          }}
        ></p>
      </div>
    </>
  );
};

export default ProductInfo;
