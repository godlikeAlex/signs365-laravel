import { IOrder } from "@/src/types/models";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import OrderCard from "../OrderCard";
import EmptyPage from "../EmptyPage";
import { router } from "@inertiajs/react";

interface Props {
  data: IOrder[];
  pageCount: number;
  currentPage: number;
}

const OrdersList: React.FC<Props> = ({
  data,
  pageCount,
  currentPage,
}: Props) => {
  if (data.length === 0) {
    return (
      <EmptyPage
        iconClass="fa-solid fa-basket-shopping"
        title="No Orders"
        size="small"
      />
    );
  }

  return (
    <div>
      {data.map((order) => (
        <OrderCard key={order.uuid} {...order} />
      ))}

      {pageCount > 1 ? (
        <div className="pagination-list" style={{ marginBottom: 30 }}>
          <button
            className="pagenation-custom"
            onClick={() => router.get(`/profile?page=${currentPage - 1}`)}
            disabled={currentPage === 1}
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
          <span style={{ marginLeft: 5, marginRight: 5 }}>
            Page
            <strong>
              {currentPage} of {pageCount}
            </strong>{" "}
          </span>
          <button
            className="pagenation-custom"
            onClick={() => router.get(`/profile?page=${currentPage + 1}`)}
            disabled={currentPage === pageCount}
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default OrdersList;
