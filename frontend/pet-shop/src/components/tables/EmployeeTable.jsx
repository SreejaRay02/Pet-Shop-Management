import React from 'react';
import { Button, OverlayTrigger, Tooltip as BSTooltip } from 'react-bootstrap';
import { formatDate } from '../../utils/helpers';
import DataTable from './DataTable';

export default function EmployeeTable({ data, isLoading, refetch, openEdit, setDeleteId }) {
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'first_name', headerName: 'First Name', sortable: true },
    { field: 'last_name', headerName: 'Last Name', sortable: true },
    { field: 'position', headerName: 'Position', sortable: true },
    { field: 'phone_number', headerName: 'Phone' },
    { 
      field: 'hire_date', 
      headerName: 'Hire Date', 
      // Use our helper function to make the date look nice
      renderCell: (row) => formatDate(row.hire_date) 
    },
    { field: 'role', headerName: 'Role' },
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
        searchPlaceholder="Search employees..." 
      />
  );
}
