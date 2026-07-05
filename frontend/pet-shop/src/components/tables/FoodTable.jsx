import React, { useMemo } from 'react';
import { formatCurrency } from '../../utils/helpers';
import DataTable from './DataTable';

// Displays the pet food list in a reusable data table
const FoodTable = ({ data, isLoading, refetch, setQtyItem, setNewQty, openEdit, setDeleteId }) => {

  // useMemo is used so the columns array is not recreated on every render
  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name', sortable: true },
    { field: 'brand', headerName: 'Brand', sortable: true },
    { field: 'type', headerName: 'Type', sortable: true },
    { field: 'quantity', headerName: 'Stock', sortable: true },   

    // Format the price before displaying it
    { field: 'price', headerName: 'Price', sortable: true,
      renderCell: (r) => formatCurrency(r.price) },

    { field: 'actions', headerName: 'Actions', sortable: false,

      // Action buttons for each row
      renderCell: (row) => (
        <div className="d-flex gap-2">

          {/* Open quantity update dialog */}
          <button
            className="btn btn-outline-warning btn-sm"
            onClick={() => {
              setQtyItem(row);
              setNewQty(String(row.quantity));
            }}
          >
            <i className="bi bi-box-seam"></i>
          </button>

          {/* Open edit form */}
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => openEdit(row)}
          >
            <i className="bi bi-pencil"></i>
          </button>

          {/* Open delete confirmation */}
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => setDeleteId(row.id)}
          >
            <i className="bi bi-trash"></i>
          </button>

        </div>
      ), 
    },
  ], [setQtyItem, setNewQty, openEdit, setDeleteId]);

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={isLoading}
      onRefresh={refetch}
      searchPlaceholder="Search by name or brand..."
    />
  );
};

// Prevent unnecessary re-renders when props don't change
export default React.memo(FoodTable);