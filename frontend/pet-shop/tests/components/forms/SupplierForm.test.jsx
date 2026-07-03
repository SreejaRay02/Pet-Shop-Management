import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SupplierForm from '../../../src/components/forms/SupplierForm';

describe('SupplierForm Component', () => {
  const mockAddresses = [
    { id: 1, street: '123 Market', city: 'Cityville' },
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
    render(<SupplierForm formik={getMockFormik()} addresses={mockAddresses} />);
    
    expect(document.querySelector('[name="name"]')).toBeInTheDocument();
    expect(document.querySelector('[name="contact_person"]')).toBeInTheDocument();
    expect(document.querySelector('[name="phone_number"]')).toBeInTheDocument();
    expect(document.querySelector('[name="email"]')).toBeInTheDocument();
    expect(document.querySelector('[name="address_id"]')).toBeInTheDocument();
  });

  it('displays validation errors when touched', () => {
    const formik = getMockFormik({
      touched: { name: true, phone_number: true },
      errors: { name: 'Required', phone_number: 'Invalid' },
    });
    render(<SupplierForm formik={formik} addresses={mockAddresses} />);
    
    expect(screen.getAllByText('Required')[0]).toBeInTheDocument();
    expect(screen.getByText('Invalid')).toBeInTheDocument();
    expect(document.querySelector('[name="name"]')).toHaveClass('is-invalid');
  });

  it('calls handleChange on input change', () => {
    const formik = getMockFormik();
    render(<SupplierForm formik={formik} addresses={mockAddresses} />);
    
    fireEvent.change(document.querySelector('[name="name"]'), { target: { value: 'PetCo' } });
    expect(formik.handleChange).toHaveBeenCalled();
  });
});
