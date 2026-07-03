import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import VaccinationTable from '../../../src/components/tables/VaccinationTable';

vi.mock('../../../src/utils/helpers', () => ({
  formatCurrency: (d) => `$${d}`,
}));

describe('VaccinationTable Component', () => {
  const mockData = [
    { id: 1, name: 'Rabies', price: 15, available: true },
    { id: 2, name: 'Flu', price: 25, available: false },
  ];

  const mockOpenEdit = vi.fn();
  const mockSetDeleteId = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders columns, data, and status badges correctly', () => {
    render(<VaccinationTable data={mockData} />);
    expect(screen.getByText('Rabies')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByText('Flu')).toBeInTheDocument();
    expect(screen.getByText('Unavailable')).toBeInTheDocument();
  });

  it('calls openEdit and setDeleteId correctly', () => {
    render(<VaccinationTable data={mockData} openEdit={mockOpenEdit} setDeleteId={mockSetDeleteId} />);
    const editButtons = document.querySelectorAll('.bi-pencil');
    fireEvent.click(editButtons[0].closest('button'));
    expect(mockOpenEdit).toHaveBeenCalledWith(mockData[0]);

    const deleteButtons = document.querySelectorAll('.bi-trash');
    fireEvent.click(deleteButtons[1].closest('button'));
    expect(mockSetDeleteId).toHaveBeenCalledWith(2);
  });
});
