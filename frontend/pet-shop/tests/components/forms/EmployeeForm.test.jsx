import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EmployeeForm from '../../../src/components/forms/EmployeeForm';

describe('EmployeeForm Component', () => {
  const mockAddresses = [
    { id: 1, city: 'NY', state: 'NY' },
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
    render(<EmployeeForm formik={getMockFormik()} addresses={mockAddresses} />);
    
    expect(document.querySelector('[name="first_name"]')).toBeInTheDocument();
    expect(document.querySelector('[name="last_name"]')).toBeInTheDocument();
    expect(document.querySelector('[name="position"]')).toBeInTheDocument();
    expect(document.querySelector('[name="hire_date"]')).toBeInTheDocument();
    expect(document.querySelector('[name="phone_number"]')).toBeInTheDocument();
    expect(document.querySelector('[name="email"]')).toBeInTheDocument();
    expect(document.querySelector('[name="role"]')).toBeInTheDocument();
    expect(document.querySelector('[name="address_id"]')).toBeInTheDocument();
  });

  it('displays validation errors', () => {
    const formik = getMockFormik({
      touched: { email: true, hire_date: true },
      errors: { email: 'Invalid email', hire_date: 'Required' },
    });
    render(<EmployeeForm formik={formik} addresses={mockAddresses} />);
    
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(document.querySelector('[name="email"]')).toHaveClass('is-invalid');
  });

  it('calls handleChange when input changes', () => {
    const formik = getMockFormik();
    render(<EmployeeForm formik={formik} addresses={mockAddresses} />);
    
    fireEvent.change(document.querySelector('[name="first_name"]'), { target: { value: 'John' } });
    expect(formik.handleChange).toHaveBeenCalled();
  });
});
