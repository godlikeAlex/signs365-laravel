import OrderService from "@/src/services/OrderService";
import React from "react";
import { Link } from "react-router-dom";
import MobileOrderList from "./MobileOrderList";
import Table from "./Table";

interface Props {}

const OrdersHistory: React.FC<Props> = ({}: Props) => {
  const [data, setData] = React.useState([]);
  const [mobileData, setMobileData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "UUID",
        accessor: "uuid",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Total",
        accessor: "total",
        Cell: ({ value }) => <strong>${value.toLocaleString()}</strong>,
      },
      {
        width: 300,
        Header: "",
        accessor: "slug",
        Cell: ({ row }) => {
          return (
            <>
              <Link to={"ss"} className="theme_button color1">
                Show Details {row.original.uuid}
              </Link>
            </>
          );
        },
      },
    ],
    []
  );

  const fetchData = React.useCallback(
    async ({ pageIndex }, loadMore: boolean = false) => {
      // This will get called when the table needs new data
      // You could fetch your data from literally anywhere,
      // even a server. But for this example, we'll just fake it.

      // Give this fetch an ID
      const fetchId = ++fetchIdRef.current;

      // Set the loading state
      setLoading(true);

      if (fetchId === fetchIdRef.current) {
        const currentPage = pageIndex + 1;

        const { data } = await OrderService.orders(currentPage);

        if (loadMore) {
          setMobileData((oldData) => {
            return [...oldData, ...data.data];
          });
        } else {
          setData(data.data);
        }

        // Your server could send back total page count.
        // For now we'll just fake it, too
        setPageCount(data.meta.last_page);

        setLoading(false);
      }
    },
    []
  );

  return (
    <>
      <div className="ps-shopping__table">
        <Table
          data={data}
          pageCount={pageCount}
          loading={loading}
          columns={columns}
          fetchData={fetchData}
        />
      </div>

      <MobileOrderList
        items={mobileData}
        loading={loading}
        fetchData={fetchData}
        pageCount={pageCount}
      />
    </>
  );
};

export default OrdersHistory;
