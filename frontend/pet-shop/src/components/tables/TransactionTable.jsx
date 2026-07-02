import React from 'react';
import { formatCurrency, formatDate, statusColor } from '../../utils/helpers';
import DataTable from './DataTable';

export default function TransactionTable({ data, isLoading, refetch, customers, pets, openEdit }) {

  const getBadgeBg = (status) => {
    const color = statusColor(status);
    if (color === 'error') return 'danger';
    if (color === 'default') return 'secondary';
    return color;
  };
  
  const columns = [
    { field: 'id', headerName: 'ID' },
    { 
      field: 'customer_id', 
      headerName: 'Customer', 
      renderCell: (row) => {
        // Find the customer's real name instead of just showing their ID
        const c = customers.find((x) => x.id === row.customer_id);
        return c ? `${c.first_name} ${c.last_name}` : `#${row.customer_id}`;
      }
    },
    { 
      field: 'pet_id', 
      headerName: 'Pet', 
      renderCell: (row) => {
        // Find the pet's real name
        const p = pets.find((x) => x.id === row.pet_id);
        return p ? p.name : `#${row.pet_id}`;
      }
    },
    { field: 'transaction_date', headerName: 'Date', sortable: true, renderCell: (r) => formatDate(r.transaction_date) },
    { field: 'amount', headerName: 'Amount', sortable: true, renderCell: (r) => formatCurrency(r.amount) },
    { 
      field: 'transaction_status', 
      headerName: 'Status', 
      renderCell: (r) => (
        <span className={`badge bg-${getBadgeBg(r.transaction_status)}`} >
          {r.transaction_status}
        </span>
      )  
    },
    {
      field: 'actions', headerName: 'Actions', sortable: false,

      renderCell: (row) => (
        
          <button className="btn btn-outline-primary btn-sm"  onClick={() => openEdit(row)}>
            <i className="bi bi-pencil" ></i>
          </button>
        
      ),
    },
  ];

  return (
    <DataTable 
        columns={columns} 
        data={data} 
        loading={isLoading} 
        onRefresh={refetch} 
        searchPlaceholder="Search transactions..." 
      />
  );
}
