import { EmptyPage, ProductCard } from "@/src/components";
import { ICategory } from "@/src/types/models";
import classNames from "classnames";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./style.css";
import ReactPaginate from "react-paginate";
import { IProduct } from "@/src/types/ProductModel";
import { router } from "@inertiajs/react";

interface Props {
  products: IProduct[];
  currentCategory: ICategory;
  pageCount: number;
  currentPage: number;
}

const CatalogProducts: React.FC<Props> = ({
  products,
  currentCategory,
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
      onCancelToken: (cancelToken) => {},
      onCancel: () => {},
      onBefore: (visit) => {},
      onStart: (visit) => {},
      onProgress: (progress) => {},
      onSuccess: (page) => {},
      onError: (errors) => {},
      onFinish: (visit) => {},
    });
  };

  return (
    <>
      <div className="ps-categogy--grid">
        <div className="row m-0">
          {products.length > 0 ? (
            products.map((product, idx) => (
              <div
                className="col-6 col-lg-4 col-xl-3 p-0"
                key={`${product.id}-${idx}`}
              >
                <ProductCard {...product} fullPage category={currentCategory} />
              </div>
            ))
          ) : (
            <EmptyPage
              iconClass="fa fa-shopping-basket"
              title="No Products Here"
              size="small"
            />
          )}
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
    </>
  );
};

export default CatalogProducts;
