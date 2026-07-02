import React from 'react';
import { formatCurrency } from '../../utils/helpers';
import DataTable from './DataTable';

export default function PetTable({ data, isLoading, refetch, categories, openEdit, setDeleteId }) {
  const columns = [
    { field: 'id', headerName: 'ID', sortable: true },
    {
      field: 'image_url', headerName: 'Image', sortable: false,
      renderCell: (row) => (
        <img className="rounded object-fit-cover"
          src={row.image_url || `https://picsum.photos/seed/${row.id}/60/40`}
          alt="Pet"
          
          style={{ width: '60px', height: '40px' }}
          onError={(e) => { e.target.src = `https://picsum.photos/seed/${row.id}/60/40`; }}
        />
      ),
    },
    { field: 'name', headerName: 'Name', sortable: true },
    { field: 'breed', headerName: 'Breed', sortable: true },
    { field: 'age', headerName: 'Age', sortable: true },
    { 
      field: 'price', 
      headerName: 'Price', 
      sortable: true, 
      renderCell: (row) => formatCurrency(row.price) 
    },
    {
      field: 'category_id', 
      headerName: 'Category', 
      sortable: false,
      renderCell: (row) => {
        // Look up the category name using the category_id
        const cat = categories.find((c) => String(c.id) === String(row.category_id));
        return <span className="badge bg-secondary fw-normal"  >{cat?.name || '-'}</span>;
      },
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
        searchPlaceholder="Search by name or breed..." 
      />
  );
}
