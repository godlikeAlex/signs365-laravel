import { ProductCard } from "@/src/components";
import { ICategory, IProduct } from "@/src/types/models";
import React from "react";
import Skeleton from "react-loading-skeleton";

interface Props {
  products: IProduct[];
  loading: boolean;
  currentCategory: ICategory;
}

const CatalogProducts: React.FC<Props> = ({
  products,
  loading,
  currentCategory,
}: Props) => {
  if (loading) {
    return (
      <div className="row" style={{ marginBottom: 20 }}>
        {new Array(12).fill("").map(() => (
          <div
            className="col-6 col-lg-4 col-xl-3 "
            style={{ marginBottom: 10 }}
          >
            <Skeleton height={160} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="ps-categogy--grid">
        <div className="row m-0">
          {products.map((product, idx) => (
            <div
              className="col-6 col-lg-4 col-xl-3 p-0"
              key={`${product.id}-${idx}`}
            >
              <ProductCard {...product} fullPage category={currentCategory} />
            </div>
          ))}
        </div>
      </div>

      <div className="ps-pagination">
        <ul className="pagination">
          <li>
            <a href="#">
              <i className="fa fa-angle-double-left"></i>
            </a>
          </li>
          <li className="active">
            <a href="#">1</a>
          </li>
          <li>
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-angle-double-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default CatalogProducts;
