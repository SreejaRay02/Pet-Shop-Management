import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EmployeeTable from '../../../src/components/tables/EmployeeTable';

vi.mock('../../../src/utils/helpers', () => ({
  formatDate: (d) => `Formatted ${d}`,
}));

describe('EmployeeTable Component', () => {
  const mockData = [
    { id: 1, first_name: 'Alice', last_name: 'Smith', position: 'Manager', phone_number: '123', hire_date: '2020-01-01', role: 'Admin' },
  ];

  const mockOpenEdit = vi.fn();
  const mockSetDeleteId = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders table columns and data correctly', () => {
    render(<EmployeeTable data={mockData} />);
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Formatted 2020-01-01')).toBeInTheDocument();
  });

  it('calls openEdit when edit button is clicked', () => {
    render(<EmployeeTable data={mockData} openEdit={mockOpenEdit} />);
    const editButton = document.querySelector('.bi-pencil').closest('button');
    fireEvent.click(editButton);
    expect(mockOpenEdit).toHaveBeenCalledWith(mockData[0]);
  });

  it('calls setDeleteId when delete button is clicked', () => {
    render(<EmployeeTable data={mockData} setDeleteId={mockSetDeleteId} />);
    const deleteButton = document.querySelector('.bi-trash').closest('button');
    fireEvent.click(deleteButton);
    expect(mockSetDeleteId).toHaveBeenCalledWith(1);
  });
});
