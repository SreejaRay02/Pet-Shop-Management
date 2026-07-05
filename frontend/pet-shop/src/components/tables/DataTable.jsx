// React hooks for state and performance optimization
import React, { useState, useMemo } from 'react';


const DataTable = ({
  columns,
  data = [],
  loading = false,
  title,
  onRefresh,
  rowsPerPageOptions = [10, 25, 50],
  searchable = true,
  searchPlaceholder = 'Search...',
  defaultOrderBy = '',
  defaultOrder = 'asc'
}) => {
  // Store the current page number (starts at 0)
  const [page, setPage] = useState(0);

  // Store how many rows to show per page
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  // Store the user's search input
  const [search, setSearch] = useState('');

  // Store which column we are currently sorting by
  const [orderBy, setOrderBy] = useState(defaultOrderBy);

  // Store the sort direction ('asc' for ascending, 'desc' for descending)
  const [order, setOrder] = useState(defaultOrder);

  // Function to handle when a user clicks a column header to sort
  const handleSort = (col) => {
    // If we click the same column that is already sorting ascending, switch to descending
    const isAsc = orderBy === col && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(col);
  };

  /*
  Filter the data based on the search box.
  useMemo remembers the result so it doesn't recalculate unless data or search changes.
  */
  const filteredData = useMemo(() => {
    if (!search) return data;
    const lowerCaseSearch = search.toLowerCase();

    return data.filter((row) =>
      columns.some((col) => {
        // Convert the field value to a string and check if it includes the search text
        const cellValue = String(row[col.field] ?? '').toLowerCase();
        return cellValue.includes(lowerCaseSearch);
      })
    );
  }, [data, search, columns]);

  /*
  Sort the filtered data.
  */
  const sortedData = useMemo(() => {
    if (!orderBy) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[orderBy] ?? '';
      const bValue = b[orderBy] ?? '';

      // Compare the two strings or numbers
      const comparison = String(aValue).localeCompare(String(bValue), undefined, { numeric: true });

      // If descending, reverse the result
      return order === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, orderBy, order]);

  /*
  Cut the data to only show the rows for the current page.
  Example: Page 1, 10 per page -> Slice from 10 to 20.
  */
  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / rowsPerPage));

  return (
    <div className="card shadow-sm border-0 overflow-hidden" >

      {/* Search Bar and Header Section */}
      {(title || searchable) && (
        <div className="card-header bg-transparent border-bottom p-3 d-flex align-items-center flex-wrap gap-3" >
          {title && <h5 className="mb-0 fw-bold flex-grow-1" >{title}</h5>}

          {searchable && (
            <div className="input-group" style={{ maxWidth: '250px' }}>
              <span className="input-group-text bg-transparent text-muted" >
                <i className="bi bi-search" ></i>
              </span>
              <input className="form-control"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0); // Go back to page 1 when searching
                }}
              />
            </div>
          )}

          {onRefresh && (
            <button className="btn btn-light btn-sm d-flex align-items-center" onClick={onRefresh} title="Refresh">
              <i className="bi bi-arrow-clockwise" ></i>
            </button>
          )}
        </div>
      )}

      {/* Main Table Section */}
      <div className="table-responsive" >
        <table className="table table-hover table-sm mb-0 align-middle" size="" >

          {/* Table Headers */}
          <thead className="table-light" >
            <tr>
              {columns.map((col) => (
                <th className={` ${`text-${col.align || 'start'} text-nowrap`}`.trim()}
                  key={col.field}

                  style={{ cursor: col.sortable !== false ? 'pointer' : 'default' }}
                  onClick={() => col.sortable !== false && handleSort(col.field)}
                >
                  {col.headerName}
                  {col.sortable !== false && (
                    <span className="ms-1 text-dark small" >
                      {orderBy === col.field ? (
                        order === 'asc' ? <i className="bi bi-arrow-up" ></i> : <i className="bi bi-arrow-down" ></i>
                      ) : (
                        <i className="bi bi-arrow-down-up opacity-50" ></i>
                      )}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body (Rows) */}
          <tbody>
            {loading ? (
              // Loading Spinner
              <tr>
                <td className="text-center py-5" colSpan={columns.length} >
                  <div className="spinner-border text-primary" role="status"></div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              // Empty State
              <tr>
                <td className="text-center py-5 text-muted" colSpan={columns.length} >
                  No records found
                </td>
              </tr>
            ) : (
              // Render Data Rows
              paginatedData.map((row, index) => (
                <tr key={row.id ?? index}>
                  {columns.map((col) => (
                    <td className={` ${`text-${col.align || 'start'}`}`.trim()} key={col.field} >
                      {/* If the column has a custom renderer, use it. Otherwise, show the raw value. */}
                      {col.renderCell ? col.renderCell(row) : (row[col.field] ?? '-')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="card-footer bg-transparent border-top p-2 d-flex align-items-center justify-content-end gap-3 flex-wrap" >
        <div className="d-flex align-items-center gap-2" >
          <span className="small text-muted" >Rows per page:</span>
          <select className="form-select"
            size="sm"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(0); // Reset to page 1 when changing rows per page
            }}
            style={{ width: 'auto' }}
          >
            {rowsPerPageOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <span className="small text-muted" >
          {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, sortedData.length)} of {sortedData.length}
        </span>

        <div className="d-flex gap-1" >
          <button className="btn btn-light btn-sm" disabled={page === 0} onClick={() => setPage(p => p - 1)}
          >
            <i className="bi bi-chevron-left" ></i>
          </button>
          <button className="btn btn-light btn-sm" disabled={page >= totalPages - 1}
            onClick={() => setPage(p => p + 1)}
          >
            <i className="bi bi-chevron-right" ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DataTable);