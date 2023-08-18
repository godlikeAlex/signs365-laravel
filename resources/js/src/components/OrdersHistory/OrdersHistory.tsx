import OrderService from "@/src/services/OrderService";
import React from "react";
import { Link } from "react-router-dom";
import MobileOrderList from "./MobileOrderList";
import OrdersList from "./OrdersList";
import Table from "./Table";

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

  const renderEmptyOrders = () => {
    return (
      <div
        className="cart-empty text-center title-with-icon-section"
        style={{ height: "50vh" }}
      >
        <div className="ps-cart__icon">
          <i
            className="fa fa-shopping-basket"
            style={{ color: "#5b6c8f", fontSize: 120 }}
          ></i>
        </div>
        <h1 className="cart-title" style={{ color: "#103178", marginTop: 20 }}>
          No Orders
        </h1>
      </div>
    );
  };

  if (data.length === 0) {
    return renderEmptyOrders();
  }

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
