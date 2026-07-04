import React, { useMemo } from 'react';
import { formatDate } from '../../utils/helpers';
import DataTable from './DataTable';

const EmployeeTable = ({ data, isLoading, refetch, openEdit, setDeleteId }) => {
  const columns = useMemo(() => [
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
  ], [openEdit, setDeleteId]);

  return (
    <DataTable 
        columns={columns} 
        data={data} 
        loading={isLoading} 
        onRefresh={refetch} 
        searchPlaceholder="Search employees..." 
      />
  );
};

export default React.memo(EmployeeTable);
