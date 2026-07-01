import React from 'react';
import { Button, OverlayTrigger, Tooltip as BSTooltip } from 'react-bootstrap';
import DataTable from './DataTable';

export default function SupplierTable({ data, isLoading, refetch, openEdit, setDeleteId }) {

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Supplier Name', sortable: true },
    { field: 'contact_person', headerName: 'Contact Person', sortable: true },
    { field: 'phone_number', headerName: 'Phone' },
    { field: 'email', headerName: 'Email', sortable: true },
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
        searchPlaceholder="Search suppliers..." 
      />
  );
}
