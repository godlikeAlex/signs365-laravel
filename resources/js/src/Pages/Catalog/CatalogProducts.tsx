import { ProductCard } from "@/src/components";
import { ICategory, IProduct } from "@/src/types/models";
import classNames from "classnames";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./style.css";
import ReactPaginate from "react-paginate";

interface Props {
  products: IProduct[];
  loading: boolean;
  currentCategory: ICategory;
  fetchProducts: (page: number | string, currentCategory: ICategory) => void;
  pageCount: number;
}

const CatalogProducts: React.FC<Props> = ({
  products,
  loading,
  currentCategory,
  pageCount,
  fetchProducts,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentCategory) {
      fetchProducts(page, currentCategory);
    }
  }, [page, currentCategory]);

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

  const handlePageClick = ({ selected }: { selected: number }) => {
    if (selected + 1 == page) {
      return;
    }

    navigate(`?page=${selected + 1}`);

    console.log("why you rendered!", selected + 1, page);
  };

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
        <ul className="pagination custom-pagenation-products">
          <ReactPaginate
            activeClassName="active"
            breakLabel="..."
            className={classNames({
              pagination: true,
              hide_on_mob_items: pageCount >= 7,
            })}
            nextLabel={<i className="fa fa-angle-double-right"></i>}
            initialPage={+page - 1}
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel={<i className="fa fa-angle-double-left"></i>}
            pageClassName="page-paginate"
            renderOnZeroPageCount={null}
          />
        </ul>
      </div>
    </>
  );
};

export default CatalogProducts;
