// React hooks for state and performance optimization
import React, { useState, useMemo } from 'react';

// Bootstrap components for building the table layout
import {
  Table, Form, InputGroup, Button, Spinner, OverlayTrigger, Tooltip
} from 'react-bootstrap';


const DataTable = ({
  columns,
  data = [],
  loading = false,
  title,
  onRefresh,
  rowsPerPageOptions = [10, 25, 50],
  searchable = true,
  searchPlaceholder = 'Search...',
}) => {
  // Store the current page number (starts at 0)
  const [page, setPage] = useState(0);
  
  // Store how many rows to show per page
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  
  // Store the user's search input
  const [search, setSearch] = useState('');
  
  // Store which column we are currently sorting by
  const [orderBy, setOrderBy] = useState('');
  
  // Store the sort direction ('asc' for ascending, 'desc' for descending)
  const [order, setOrder] = useState('asc');

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
    <div className="card shadow-sm border-0 overflow-hidden">
      
      {/* Search Bar and Header Section */}
      {(title || searchable) && (
        <div className="card-header bg-transparent border-bottom p-3 d-flex align-items-center flex-wrap gap-3">
          {title && <h5 className="mb-0 fw-bold flex-grow-1">{title}</h5>}
          
          {searchable && (
            <InputGroup size="sm" style={{ maxWidth: '250px' }}>
              <InputGroup.Text className="bg-transparent text-muted">
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => { 
                  setSearch(e.target.value); 
                  setPage(0); // Go back to page 1 when searching
                }}
              />
            </InputGroup>
          )}
          
          {onRefresh && (
            <OverlayTrigger placement="top" overlay={<Tooltip>Refresh</Tooltip>}>
              <Button variant="light" size="sm" onClick={onRefresh} className="d-flex align-items-center">
                <i className="bi bi-arrow-clockwise"></i>
              </Button>
            </OverlayTrigger>
          )}
        </div>
      )}

      {/* Main Table Section */}
      <div className="table-responsive">
        <Table hover size="sm" className="mb-0 align-middle">
          
          {/* Table Headers */}
          <thead className="table-light">
            <tr>
              {columns.map((col) => (
                <th 
                  key={col.field} 
                  className={`text-${col.align || 'start'} text-nowrap`}
                  style={{ cursor: col.sortable !== false ? 'pointer' : 'default' }}
                  onClick={() => col.sortable !== false && handleSort(col.field)}
                >
                  {col.headerName}
                  {col.sortable !== false && (
                    <span className="ms-1 text-muted small">
                      {orderBy === col.field ? (
                        order === 'asc' ? <i className="bi bi-arrow-up"></i> : <i className="bi bi-arrow-down"></i>
                      ) : (
                        <i className="bi bi-arrow-down-up opacity-25"></i>
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
                <td colSpan={columns.length} className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={columns.length} className="text-center py-5 text-muted">
                  No records found
                </td>
              </tr>
            ) : (
              // Render Data Rows
              paginatedData.map((row, index) => (
                <tr key={row.id ?? index}>
                  {columns.map((col) => (
                    <td key={col.field} className={`text-${col.align || 'start'}`}>
                      {/* If the column has a custom renderer, use it. Otherwise, show the raw value. */}
                      {col.renderCell ? col.renderCell(row) : (row[col.field] ?? '-')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="card-footer bg-transparent border-top p-2 d-flex align-items-center justify-content-end gap-3 flex-wrap">
        <div className="d-flex align-items-center gap-2">
          <span className="small text-muted">Rows per page:</span>
          <Form.Select 
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
          </Form.Select>
        </div>
        
        <span className="small text-muted">
          {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, sortedData.length)} of {sortedData.length}
        </span>
        
        <div className="d-flex gap-1">
          <Button 
            variant="light" 
            size="sm" 
            disabled={page === 0} 
            onClick={() => setPage(p => p - 1)}
          >
            <i className="bi bi-chevron-left"></i>
          </Button>
          <Button 
            variant="light" 
            size="sm" 
            disabled={page >= totalPages - 1} 
            onClick={() => setPage(p => p + 1)}
          >
            <i className="bi bi-chevron-right"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;