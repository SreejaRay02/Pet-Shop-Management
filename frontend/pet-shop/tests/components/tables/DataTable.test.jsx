import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DataTable from '../../../src/components/tables/DataTable';

describe('DataTable Component', () => {
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name', sortable: true },
    { field: 'age', headerName: 'Age', sortable: false },
    { 
      field: 'custom', 
      headerName: 'Custom', 
      renderCell: (row) => <span data-testid={`custom-${row.id}`}>Custom {row.name}</span> 
    }
  ];

  const data = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 35 },
  ];

  it('renders columns and data rows successfully', () => {
    render(<DataTable columns={columns} data={data} />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
    expect(screen.getByTestId('custom-1')).toHaveTextContent('Custom Alice');
  });

  it('renders empty state when data is empty', () => {
    render(<DataTable columns={columns} data={[]} />);
    expect(screen.getByText('No records found')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    render(<DataTable columns={columns} data={data} loading={true} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('handles searching data', () => {
    render(<DataTable columns={columns} data={data} searchable={true} />);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Ali' } });
    
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
  });

  it('handles sorting data', () => {
    render(<DataTable columns={columns} data={data} />);
    
    const nameHeader = screen.getByText('Name');
    
    // Sort Ascending
    fireEvent.click(nameHeader);
    const rowsAsc = screen.getAllByRole('row');
    // First row is header, second is Alice, third is Bob...
    expect(rowsAsc[1]).toHaveTextContent('Alice');
    expect(rowsAsc[2]).toHaveTextContent('Bob');

    // Sort Descending
    fireEvent.click(nameHeader);
    const rowsDesc = screen.getAllByRole('row');
    expect(rowsDesc[1]).toHaveTextContent('Charlie');
    expect(rowsDesc[2]).toHaveTextContent('Bob');
    expect(rowsDesc[3]).toHaveTextContent('Alice');
  });

  it('handles pagination', () => {
    const manyRows = Array.from({ length: 15 }, (_, i) => ({ id: i + 1, name: `User ${i + 1}`, age: 20 }));
    render(<DataTable columns={columns} data={manyRows} rowsPerPageOptions={[10, 20]} />);
    
    // Should show rows 1 to 10
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 10')).toBeInTheDocument();
    expect(screen.queryByText('User 11')).not.toBeInTheDocument();

    // Go to next page
    const nextButton = document.querySelector('.bi-chevron-right').closest('button');
    fireEvent.click(nextButton);

    // Should show rows 11 to 15
    expect(screen.queryByText('User 10')).not.toBeInTheDocument();
    expect(screen.getByText('User 11')).toBeInTheDocument();
    expect(screen.getByText('User 15')).toBeInTheDocument();
  });

  it('calls onRefresh when refresh button is clicked', () => {
    const refreshSpy = vi.fn();
    render(<DataTable columns={columns} data={data} onRefresh={refreshSpy} />);
    
    const refreshButton = screen.getByTitle('Refresh');
    fireEvent.click(refreshButton);
    expect(refreshSpy).toHaveBeenCalledTimes(1);
  });
});
