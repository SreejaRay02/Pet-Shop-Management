import React from 'react';
import { formatCurrency } from '../../utils/helpers';
import DataTable from './DataTable';

export default function GroomingTable({ data, isLoading, refetch, openEdit, setDeleteId }) {

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Service Name', sortable: true },
    { field: 'price', headerName: 'Price', sortable: true, renderCell: (r) => formatCurrency(r.price) },
    { 
      field: 'available', 
      headerName: 'Status', 
      renderCell: (r) => (
        <span className={` ${`badge bg-${r.available ? 'success' : 'danger'}`}`.trim()} >
          {r.available ? 'Available' : 'Unavailable'}
        </span>
      )
    },
    {
      field: 'actions', headerName: 'Actions', sortable: false,
      renderCell: (row) => (
        <div className="d-flex gap-2" >
          
            <button className="btn btn-outline-primary btn-sm"  onClick={() => openEdit(row)}>
              <i className="bi bi-pencil" ></i>
            </button>
          
          
            <button className="btn btn-outline-danger btn-sm"  onClick={() => setDeleteId(row.id)}>
              <i className="bi bi-trash" ></i>
            </button>
          
        </div>
      ),
    },
  ];

  return (
    <DataTable 
        columns={columns} 
        data={data} 
        loading={isLoading} 
        onRefresh={refetch} 
        searchPlaceholder="Search services..." 
      />
  );
}
