import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PetTable from '../../../src/components/tables/PetTable';

vi.mock('../../../src/utils/helpers', () => ({
  formatCurrency: (d) => `$${d}`,
}));

describe('PetTable Component', () => {
  const mockData = [
    { id: 1, name: 'Buddy', breed: 'Dog', age: 2, price: 100, category_id: 1, image_url: '' },
  ];

  const mockCategories = [
    { id: 1, name: 'Dogs Category' },
  ];

  const mockOpenEdit = vi.fn();
  const mockSetDeleteId = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders columns and data correctly', () => {
    render(<PetTable data={mockData} categories={mockCategories} />);
    expect(screen.getByText('Buddy')).toBeInTheDocument();
    expect(screen.getByText('Dogs Category')).toBeInTheDocument();
  });

  it('renders image with fallback on error', () => {
    render(<PetTable data={mockData} categories={mockCategories} />);
    const image = screen.getByAltText('Pet');
    fireEvent.error(image);
    expect(image.src).toContain('picsum.photos/seed/1/60/40');
  });

  it('calls openEdit correctly', () => {
    render(<PetTable data={mockData} categories={mockCategories} openEdit={mockOpenEdit} />);
    const editButton = document.querySelector('.bi-pencil').closest('button');
    fireEvent.click(editButton);
    expect(mockOpenEdit).toHaveBeenCalledWith(mockData[0]);
  });
});
