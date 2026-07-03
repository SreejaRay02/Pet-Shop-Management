import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TransactionTable from '../../../src/components/tables/TransactionTable';

vi.mock('../../../src/utils/helpers', () => ({
  formatCurrency: (d) => `$${d}`,
  formatDate: (d) => `Date ${d}`,
  statusColor: (status) => status === 'Success' ? 'success' : 'error',
}));

describe('TransactionTable Component', () => {
  const mockData = [
    { id: 1, customer_id: 10, pet_id: 20, transaction_date: '2022-01-01', amount: 100, transaction_status: 'Success' },
    { id: 2, customer_id: 99, pet_id: 99, transaction_date: '2022-01-02', amount: 50, transaction_status: 'Failed' },
  ];

  const mockCustomers = [
    { id: 10, first_name: 'Alice', last_name: 'Wonder' },
  ];

  const mockPets = [
    { id: 20, name: 'Rex' },
  ];

  const mockOpenEdit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders columns and data correctly', () => {
    render(<TransactionTable data={mockData} customers={mockCustomers} pets={mockPets} />);
    expect(screen.getByText('Alice Wonder')).toBeInTheDocument();
    expect(screen.getByText('Rex')).toBeInTheDocument();
    expect(screen.getByText('Date 2022-01-01')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('Success')).toHaveClass('badge bg-success');
    expect(screen.getByText('Failed')).toHaveClass('badge bg-danger');
  });

  it('renders fallback for missing customer and pet', () => {
    render(<TransactionTable data={mockData} customers={mockCustomers} pets={mockPets} />);
    expect(screen.getAllByText('#99')[0]).toBeInTheDocument(); // Missing customer or pet
  });

  it('hides customer column and edit actions if adminView is false', () => {
    render(<TransactionTable data={mockData} adminView={false} />);
    expect(screen.queryByText('Customer')).not.toBeInTheDocument();
    expect(screen.queryByText('Alice Wonder')).not.toBeInTheDocument();
    expect(screen.queryByText('Actions')).not.toBeInTheDocument();
  });

  it('calls openEdit correctly', () => {
    render(<TransactionTable data={mockData} openEdit={mockOpenEdit} />);
    const editButton = document.querySelectorAll('.bi-pencil')[0].closest('button');
    fireEvent.click(editButton);
    expect(mockOpenEdit).toHaveBeenCalledWith(mockData[0]);
  });
});
 