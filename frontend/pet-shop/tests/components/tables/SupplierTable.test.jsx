import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SupplierTable from '../../../src/components/tables/SupplierTable';

describe('SupplierTable Component', () => {
  const mockData = [
    { id: 1, name: 'Supplier A', contact_person: 'John Doe', phone_number: '12345', email: 'john@a.com' },
  ];

  const mockOpenEdit = vi.fn();
  const mockSetDeleteId = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders columns and data correctly', () => {
    render(<SupplierTable data={mockData} />);
    expect(screen.getByText('Supplier A')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('calls openEdit and setDeleteId correctly', () => {
    render(<SupplierTable data={mockData} openEdit={mockOpenEdit} setDeleteId={mockSetDeleteId} />);
    const editButton = document.querySelector('.bi-pencil').closest('button');
    fireEvent.click(editButton);
    expect(mockOpenEdit).toHaveBeenCalledWith(mockData[0]);

    const deleteButton = document.querySelector('.bi-trash').closest('button');
    fireEvent.click(deleteButton);
    expect(mockSetDeleteId).toHaveBeenCalledWith(1);
  });
});
