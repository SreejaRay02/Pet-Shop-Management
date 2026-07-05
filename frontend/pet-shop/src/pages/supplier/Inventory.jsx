import React, { useMemo } from 'react';
import DataTable from '../../components/tables/DataTable';
import { PageHeader } from '../../components/layout/PageHeader';
import { usePetFoods } from '../../hooks/queries/usePetFoods';
import { formatCurrency } from '../../utils/helpers';

export default function Inventory() {
  const { data = [], isLoading, refetch } = usePetFoods();
  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Food Name', sortable: true },
    { field: 'brand', headerName: 'Brand', sortable: true },
    { 
      field: 'type', 
      headerName: 'Type', 
      renderCell: (row) => <span className="badge bg-light text-dark border fw-normal">{row.type}</span> 
    },
    {
      field: 'quantity', 
      headerName: 'Stock Level', 
      sortable: true,
      renderCell: (row) => (
        <div style={{ minWidth: '120px' }}>
          <div className="d-flex justify-content-between align-items-center mb-1" >
            <small className="text-muted" >{row.quantity} units</small>
            <span className={` ${`badge fw-normal bg-${row.quantity < 50 ? 'warning' : 'success'}`}`.trim()} >
              {row.quantity < 50 ? 'Low Stock' : 'In Stock'}
            </span>
          </div>
          <div className="progress"  style={{ height: '6px' }}>
            <div className={` ${`progress-bar bg-${row.quantity < 50 ? 'warning' : 'success'}`}`.trim()} 
               
              role="progressbar" 
              style={{ width: `${Math.min((row.quantity / 500) * 100, 100)}%` }} 
              aria-valuenow={Math.min((row.quantity / 500) * 100, 100)} 
              aria-valuemin="0" 
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      ),
    },
    { 
      field: 'price', 
      headerName: 'Price', 
      sortable: true, 
      renderCell: (row) => formatCurrency(row.price) 
    },
  ], []);

  return (
    <div className="container p-0" fluid >
      <PageHeader title="Inventory Management" subtitle="View current pet food stock levels" />
      <DataTable 
        columns={columns} 
        data={data} 
        loading={isLoading} 
        onRefresh={refetch} 
        searchPlaceholder="Search by name or brand..." 
      />
    </div>
  );
}