import React from "react";
import { router } from "@inertiajs/react";
import classNames from "classnames";
import ReactPaginate from "react-paginate";
import { EmptyPage, ProductCard } from "@/src/components";
import { ICategory, IProductCard } from "@/src/types/models";

import "./style.css";

interface Props {
  products: IProductCard[];
  currentCategory: ICategory;
  pageCount: number;
  currentPage: number;
}

const CatalogProducts: React.FC<Props> = ({
  products,
  pageCount,
  currentPage,
}: Props) => {
  const handlePageClick = ({ selected }: { selected: number }) => {
    if (selected + 1 === currentPage) {
      return;
    }

    router.visit(`?page=${selected + 1}`, {
      method: "get",
      data: {},
      replace: false,
      preserveState: false,
      preserveScroll: false,
      only: [],
      headers: {},
      errorBag: null,
      forceFormData: false,
    });
  };

  return (
    <>
      <div>
        <div className="row">
          {products.length > 0 ? (
            products.map((product, idx) => (
              <div
                className="col-12 col-lg-4 col-xl-3 mb-25"
                key={`${product.id}-${idx}`}
              >
                <ProductCard {...product} variant="catalog" />
              </div>
            ))
          ) : (
            <EmptyPage
              iconClass="fa-solid fa-basket-shopping"
              title="No Products Here"
              size="small"
            />
          )}
        </div>
      </div>

      {pageCount > 1 && (
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
              initialPage={currentPage > 0 ? currentPage - 1 : 0}
              onPageChange={handlePageClick}
              pageRangeDisplayed={pageCount}
              pageCount={pageCount}
              previousLabel={<i className="fa fa-angle-double-left"></i>}
              pageClassName="page-paginate"
              renderOnZeroPageCount={null}
            />
          </ul>
        </div>
      )}
    </>
  );
};

export default CatalogProducts;
