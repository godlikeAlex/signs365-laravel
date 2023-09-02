import { IOrder } from "@/src/types/models";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import OrderCard from "../OrderCard";
import EmptyPage from "../EmptyPage";

interface Props {
  data: IOrder[];
  pageCount: number;
  loading: boolean;
  fetchData: ({ pageIndex }: { pageIndex: any }) => void;
}

const OrdersList: React.FC<Props> = ({
  data,
  pageCount,
  fetchData,
  loading,
}: Props) => {
  const [pageIndex, setPageIndex] = useState(0);

  React.useEffect(() => {
    fetchData({ pageIndex });
  }, [fetchData, pageIndex]);

  if (loading) {
    return (
      <div style={{ marginBottom: 20 }}>
        <Skeleton height={200} count={5} />
      </div>
    );
  }

  // if (data.length === 0) {
  //   return (
  //     <EmptyPage
  //       iconClass="fa fa-shopping-basket"
  //       title="No Orders"
  //       size="small"
  //     />
  //   );
  // }

  return (
    <div>
      {data.map((order) => (
        <OrderCard key={order.uuid} {...order} />
      ))}

      {pageCount > 1 ? (
        <div className="pagination-list" style={{ marginBottom: 30 }}>
          <button
            className="pagenation-custom"
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            <i className="fa fa-chevron-left" />
          </button>
          <span style={{ marginLeft: 5, marginRight: 5 }}>
            Page
            <strong>
              {pageIndex + 1} of {pageCount}
            </strong>{" "}
          </span>
          <button
            className="pagenation-custom"
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={pageIndex + 1 === pageCount}
          >
            <i className="fa fa-chevron-right" />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default OrdersList;
