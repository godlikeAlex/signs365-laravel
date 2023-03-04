import React from "react";

interface TableProps {}

const Table: React.FC<TableProps> = ({}: TableProps) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "UUID",
        accessor: "uuid",
      },
      {
        Header: "STATUS",
        accessor: "status",
      },
      {
        Header: "AMOUNT",
        accessor: "amount",
        Cell: ({ value }) => <span>{value} $</span>,
      },
      {
        Header: "SCHEDULE DATE",
        accessor: "date",
      },
      {
        width: 300,
        Header: "",
        accessor: "actions",
        Cell: ({ value }) => (
          <>
            <Link
              to={`/cabinet/dashboard/show/${value}`}
              className="theme_button color1"
            >
              Show Details
            </Link>
          </>
        ),
      },
    ],
    []
  );

  return <></>;
};

export default Table;
