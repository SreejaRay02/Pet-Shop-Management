import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FoodTable from '../../../src/components/tables/FoodTable';

// Mock the helper function used in the table
vi.mock('../../../src/utils/helpers', () => ({
  formatCurrency: (d) => `$${d}`,
}));

describe('FoodTable Component', () => {
  // Sample food data for testing
  const mockData = [
    { id: 1, name: 'Dog Food', brand: 'BrandX', type: 'Dry', quantity: 10, price: 50 },
  ];

  // Mock callback functions
  const mockOpenEdit = vi.fn();
  const mockSetDeleteId = vi.fn();
  const mockSetQtyItem = vi.fn();
  const mockSetNewQty = vi.fn();

  // Reset mocks before each test
  beforeEach(() => { 
    vi.clearAllMocks();
  });

  // Verify table headers and data are displayed
  it('renders table columns and data correctly', () => {
    render(<FoodTable data={mockData} />);
    expect(screen.getByText('Name')).toBeInTheDocument(); 
    expect(screen.getByText('Dog Food')).toBeInTheDocument();
    expect(screen.getByText('$50')).toBeInTheDocument();
  });

  // Verify quick stock update button works
  it('calls setQtyItem and setNewQty on quick update stock', () => {
    render(<FoodTable data={mockData} setQtyItem={mockSetQtyItem} setNewQty={mockSetNewQty} />);
    // Find the quick update button
    const quickUpdateButton = document.querySelector('.bi-box-seam').closest('button');
    fireEvent.click(quickUpdateButton);
    expect(mockSetQtyItem).toHaveBeenCalledWith(mockData[0]);
    expect(mockSetNewQty).toHaveBeenCalledWith('10');
  });

  // Verify edit button calls the edit handler
  it('calls openEdit when edit button is clicked', () => {
    render(<FoodTable data={mockData} openEdit={mockOpenEdit} />);
    const editButton = screen.getAllByRole('button')[1]; // assuming 0 is quick update, 1 is edit
    fireEvent.click(editButton);
    expect(mockOpenEdit).toHaveBeenCalledWith(mockData[0]);
  });
});