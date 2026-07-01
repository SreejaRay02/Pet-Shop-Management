import React from 'react';
import { Button, OverlayTrigger, Tooltip as BSTooltip, Badge } from 'react-bootstrap';
import { formatCurrency } from '../../utils/helpers';
import DataTable from './DataTable';

export default function PetTable({ data, isLoading, refetch, categories, openEdit, setDeleteId }) {
  const columns = [
    { field: 'id', headerName: 'ID', sortable: true },
    {
      field: 'image_url', headerName: 'Image', sortable: false,
      renderCell: (row) => (
        <img
          src={row.image_url || `https://picsum.photos/seed/${row.id}/60/40`}
          alt="Pet"
          className="rounded object-fit-cover"
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
        const cat = categories.find((c) => c.id === row.category_id);
        return <Badge bg="secondary" className="fw-normal">{cat?.name || '-'}</Badge>;
      },
    },
    {
      field: 'actions', headerName: 'Actions', sortable: false,
      renderCell: (row) => (
        <div className="d-flex gap-2">
          <OverlayTrigger placement="top" overlay={<BSTooltip>Edit</BSTooltip>}>
            <Button variant="outline-primary" size="sm" onClick={() => openEdit(row)}>
              <i className="bi bi-pencil"></i>
            </Button>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<BSTooltip>Delete</BSTooltip>}>
            <Button variant="outline-danger" size="sm" onClick={() => setDeleteId(row.id)}>
              <i className="bi bi-trash"></i>
            </Button>
          </OverlayTrigger>
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
