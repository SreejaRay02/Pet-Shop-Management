import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PetForm from '../../../src/components/forms/PetForm';

describe('PetForm Component', () => {
  const mockCategories = [
    { id: 1, name: 'Dogs' },
    { id: 2, name: 'Cats' },
  ];

  const getMockFormik = (overrides = {}) => ({
    values: {},
    touched: {},
    errors: {},
    handleChange: vi.fn(),
    handleBlur: vi.fn(),
    ...overrides,
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form fields successfully', () => {
    render(<PetForm formik={getMockFormik()} categories={mockCategories} />);
    
    expect(document.querySelector('[name="name"]')).toBeInTheDocument();
    expect(document.querySelector('[name="breed"]')).toBeInTheDocument();
    expect(document.querySelector('[name="age"]')).toBeInTheDocument();
    expect(document.querySelector('[name="price"]')).toBeInTheDocument();
    expect(document.querySelector('[name="category_id"]')).toBeInTheDocument();
    expect(document.querySelector('[name="image_url"]')).toBeInTheDocument();
    expect(document.querySelector('[name="description"]')).toBeInTheDocument();
  });

  it('displays validation errors when touched', () => {
    const formik = getMockFormik({
      touched: { name: true, category_id: true },
      errors: { name: 'Name is required', category_id: 'Select category' },
    });
    render(<PetForm formik={formik} categories={mockCategories} />);
    
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Select category')).toBeInTheDocument();
    expect(document.querySelector('[name="name"]')).toHaveClass('is-invalid');
  });

  it('calls handleChange on input change', () => {
    const formik = getMockFormik();
    render(<PetForm formik={formik} categories={mockCategories} />);
    
    fireEvent.change(document.querySelector('[name="name"]'), { target: { value: 'Buddy' } });
    expect(formik.handleChange).toHaveBeenCalled();
  });
});
