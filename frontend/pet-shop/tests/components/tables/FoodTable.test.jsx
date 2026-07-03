import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FoodTable from '../../../src/components/tables/FoodTable';

vi.mock('../../../src/utils/helpers', () => ({
  formatCurrency: (d) => `$${d}`,
}));

describe('FoodTable Component', () => {
  const mockData = [
    { id: 1, name: 'Dog Food', brand: 'BrandX', type: 'Dry', quantity: 10, price: 50 },
  ];

  const mockOpenEdit = vi.fn();
  const mockSetDeleteId = vi.fn();
  const mockSetQtyItem = vi.fn();
  const mockSetNewQty = vi.fn();

  beforeEach(() => { 
    vi.clearAllMocks();
  });

  it('renders table columns and data correctly', () => {
    render(<FoodTable data={mockData} />);
    expect(screen.getByText('Name')).toBeInTheDocument(); 
    expect(screen.getByText('Dog Food')).toBeInTheDocument();
    expect(screen.getByText('$50')).toBeInTheDocument();
  });

  it('calls setQtyItem and setNewQty on quick update stock', () => {
    render(<FoodTable data={mockData} setQtyItem={mockSetQtyItem} setNewQty={mockSetNewQty} />);
    // Finding button by class bi-box-seam
    const quickUpdateButton = document.querySelector('.bi-box-seam').closest('button');
    fireEvent.click(quickUpdateButton);
    expect(mockSetQtyItem).toHaveBeenCalledWith(mockData[0]);
    expect(mockSetNewQty).toHaveBeenCalledWith('10');
  });

  it('calls openEdit when edit button is clicked', () => {
    render(<FoodTable data={mockData} openEdit={mockOpenEdit} />);
    const editButton = screen.getAllByRole('button')[1]; // assuming 0 is quick update, 1 is edit
    fireEvent.click(editButton);
    expect(mockOpenEdit).toHaveBeenCalledWith(mockData[0]);
  });
});
