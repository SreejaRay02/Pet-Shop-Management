import React, { useMemo } from 'react';
import { formatCurrency } from '../../utils/helpers';
import DataTable from './DataTable';

const FoodTable = ({ data, isLoading, refetch, setQtyItem, setNewQty, openEdit, setDeleteId }) => {

  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name', sortable: true },
    { field: 'brand', headerName: 'Brand', sortable: true },
    { field: 'type', headerName: 'Type', sortable: true },
    { field: 'quantity', headerName: 'Stock', sortable: true },
    { field: 'price', headerName: 'Price', sortable: true, renderCell: (r) => formatCurrency(r.price) },
    {
      field: 'actions', headerName: 'Actions', sortable: false,
      renderCell: (row) => (
        <div className="d-flex gap-2" >
          {/* Custom Action: Quick update stock */}
          
            <button className="btn btn-outline-warning btn-sm"  onClick={() => { 
                setQtyItem(row); 
                setNewQty(String(row.quantity)); 
              }}
            >
              <i className="bi bi-box-seam" ></i>
            </button>
          
          
          
            <button className="btn btn-outline-primary btn-sm"  onClick={() => openEdit(row)}>
              <i className="bi bi-pencil" ></i>
            </button>
          
          
          
            <button className="btn btn-outline-danger btn-sm"  onClick={() => setDeleteId(row.id)}>
              <i className="bi bi-trash" ></i>
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

export default React.memo(FoodTable);
