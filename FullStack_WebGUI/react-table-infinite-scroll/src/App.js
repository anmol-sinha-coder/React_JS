import React, { useState } from "react";
import styled from "styled-components";
import { useTable, useSortBy } from "react-table";

import InfiniteScroll from "react-infinite-scroll-component";

import makeData from "./makeData";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Table({ columns, data, update }) {
  // Use the state and functions returned from useTable to build your UI

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy }
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  );

  React.useEffect(() => {
    console.log("sort");
  }, [sortBy]);

  // Render the UI for your table
  return (
    <InfiniteScroll
      dataLength={rows.length}
      next={update}
      hasMore={true}
      loader={<h4>Loading more 2 itens...</h4>}
    >
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </InfiniteScroll>
  );
}

function App() {
  const [items, setItems] = useState(makeData(40));

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName"
          },
          {
            Header: "Last Name",
            accessor: "lastName"
          }
        ]
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age"
          },
          {
            Header: "Visits",
            accessor: "visits"
          },
          {
            Header: "Status",
            accessor: "status"
          },
          {
            Header: "Profile Progress",
            accessor: "progress"
          }
        ]
      }
    ],
    []
  );

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems(items.concat(makeData(2)));
    }, 1500);
  };

  const data = React.useMemo(() => items, [items]);

  return (
    <Styles>
      <Table columns={columns} data={data} update={fetchMoreData} />
    </Styles>
  );
}

export default App;
