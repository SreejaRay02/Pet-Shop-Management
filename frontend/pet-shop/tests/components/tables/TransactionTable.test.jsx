import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TransactionTable from '../../../src/components/tables/TransactionTable';

// Mock helper functions used by the table
vi.mock('../../../src/utils/helpers', () => ({
  formatCurrency: (d) => `$${d}`,
  formatDate: (d) => `Date ${d}`,
  statusColor: (status) => status === 'Success' ? 'success' : 'error',
}));

describe('TransactionTable Component', () => {
  // Sample transaction data for testing
  const mockData = [
    { id: 1, customer_id: 10, pet_id: 20, transaction_date: '2022-01-01', amount: 100, transaction_status: 'Success' },
    { id: 2, customer_id: 99, pet_id: 99, transaction_date: '2022-01-02', amount: 50, transaction_status: 'Failed' },
  ];

  // Sample customer data
  const mockCustomers = [
    { id: 10, first_name: 'Alice', last_name: 'Wonder' },
  ];

  // Sample pet data
  const mockPets = [
    { id: 20, name: 'Rex' },
  ];

  // Mock edit handler
  const mockOpenEdit = vi.fn();

  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Verify table data is displayed correctly
  it('renders columns and data correctly', () => {
    render(<TransactionTable data={mockData} customers={mockCustomers} pets={mockPets} />);
    expect(screen.getByText('Alice Wonder')).toBeInTheDocument();
    expect(screen.getByText('Rex')).toBeInTheDocument();
    expect(screen.getByText('Date 2022-01-01')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('Success')).toHaveClass('badge bg-success');
    expect(screen.getByText('Failed')).toHaveClass('badge bg-danger');
  });

  // Verify fallback values are shown for missing data
  it('renders fallback for missing customer and pet', () => {
    render(<TransactionTable data={mockData} customers={mockCustomers} pets={mockPets} />);
    expect(screen.getAllByText('#99')[0]).toBeInTheDocument(); // Missing customer or pet
  });

  // Verify customer column and actions are hidden for customers
  it('hides customer column and edit actions if adminView is false', () => {
    render(<TransactionTable data={mockData} adminView={false} />);
    expect(screen.queryByText('Customer')).not.toBeInTheDocument();
    expect(screen.queryByText('Alice Wonder')).not.toBeInTheDocument();
    expect(screen.queryByText('Actions')).not.toBeInTheDocument();
  });

  // Verify edit button calls the edit handler
  it('calls openEdit correctly', () => {
  render(<TransactionTable data={mockData} customers={mockCustomers} pets={mockPets} openEdit={mockOpenEdit} adminView={true} /> );
  const editButtons = screen.getAllByRole('button');
  fireEvent.click(editButtons[0]);
  expect(mockOpenEdit).toHaveBeenCalledTimes(1);
  expect(mockOpenEdit).toHaveBeenCalledWith(mockData[1]);
  });
});