import OrderService from "@/src/services/OrderService";
import React from "react";
import { Link } from "react-router-dom";
import MobileOrderList from "./MobileOrderList";
import OrdersList from "./OrdersList";
import Table from "./Table";
import EmptyPage from "../EmptyPage";

interface Props {}

const OrdersHistory: React.FC<Props> = ({}: Props) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);

  const fetchData = React.useCallback(async ({ pageIndex }) => {
    setLoading(true);

    const currentPage = pageIndex + 1;

    const { data } = await OrderService.orders(currentPage);

    setData(data.data);
    setPageCount(data.meta.last_page);
    setLoading(false);
  }, []);

  return (
    <>
      <div>
        <OrdersList
          data={data}
          pageCount={pageCount}
          loading={loading}
          fetchData={fetchData}
        />
      </div>
    </>
  );
};

export default OrdersHistory;
