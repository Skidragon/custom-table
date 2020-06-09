import React from "react";
import styled from "styled-components";
import { useTable, useFilters, useSortBy } from "react-table";
const slateBlue = "#415464";
const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    tr:nth-child(even) {
      background: rgb(184, 183, 183);
    }
    tr:nth-child(odd) {
      background: rgb(224, 224, 224);
    }
    tr:nth-child(even):hover {
      background: rgb(184, 183, 183);
    }
    tr:nth-child(odd):hover {
      background: rgb(224, 224, 224);
    }
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th {
      background: ${slateBlue};
      color: white;
      padding: 0.2rem;
      border-bottom: 2px solid ${slateBlue};
      border-right: 2px solid ${slateBlue};
    }
    td {
      margin: 0;
      padding: 0.8rem;
      border-bottom: 2px solid ${slateBlue};
      border-right: 2px solid ${slateBlue};

      :last-child {
        border-right: 0;
      }
    }
  }
`;
const Header = styled.div`
  cursor: pointer;
  border-top: ${props =>
    props.isSorted && !props.isSortedDesc ? `3px solid black` : ""};
  border-bottom: ${props =>
    props.isSorted && props.isSortedDesc ? `3px solid black` : ""};
`;
const DefaultColumnFilter = ({
  column: { filterValue, setFilter, filterId = "" }
}) => {
  return (
    <input
      value={filterValue || ""}
      autoComplete="new-password"
      id={filterId}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Filter`}
      style={{
        borderRadius: "5px",
        padding: "4px",
        outline: "none",
        width: "95%"
      }}
    />
  );
};
export default function HorizonTable({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useFilters,
    useSortBy
  );

  // Render the UI for your table
  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <Header
                    {...column}
                    {...column.getSortByToggleProps()}
                    style={{
                      padding: "6px 0"
                    }}
                  >
                    {column.render("Header")}
                  </Header>
                  {column.canFilter && (
                    <div
                      style={{
                        marginTop: "6px",
                        padding: "0 4px"
                      }}
                    >
                      {column.render("Filter")}
                    </div>
                  )}
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
    </Styles>
  );
}
