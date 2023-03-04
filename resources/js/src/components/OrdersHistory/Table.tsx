import React from "react";
import { useTable, usePagination } from "react-table";

interface TableProps {
  loading: boolean;
  columns: any[];
  data: any[];
  pageCount: number;
  fetchData: ({
    pageSize,
    pageIndex,
  }: {
    pageSize: any;
    pageIndex: any;
  }) => void;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
}: TableProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    usePagination
  );

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()} className="table-custom">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className={"ps-table__th"}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
          <tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td>Loading...</td>
            ) : null}
          </tr>
        </tbody>
      </table>

      <div className="pagination-list">
        <button
          className="pagenation-custom"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <i className="fa fa-chevron-left" />
        </button>
        <span style={{ marginLeft: 5, marginRight: 5 }}>
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button
          className="pagenation-custom"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <i className="fa fa-chevron-right" />
        </button>
      </div>
    </>
  );
};

export default Table;
