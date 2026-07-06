import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TransactionForm from '../../../src/components/forms/TransactionForm';

describe('TransactionForm Component', () => {
  // Sample customer data for testing
  const mockCustomers = [
    { id: 1, first_name: 'John', last_name: 'Doe' },
  ];
  
  // Sample pet data for testing
  const mockPets = [
    { id: 1, name: 'Rex', breed: 'Dog' },
  ];

  // Create a mock Formik object
  const getMockFormik = (overrides = {}) => ({
    // Default form values
    values: {},

    // Tracks touched fields
    touched: {},

    // Holds validation errors
    errors: {},

    // Mock Formik handlers
    handleChange: vi.fn(),
    handleBlur: vi.fn(),

    // Allow custom values for different test cases
    ...overrides,
  });

  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Verify all form fields are rendered
  it('renders all form fields successfully', () => {
    render(<TransactionForm formik={getMockFormik()} customers={mockCustomers} pets={mockPets} />);
    
    expect(document.querySelector('[name="customer_id"]')).toBeInTheDocument();
    expect(document.querySelector('[name="pet_id"]')).toBeInTheDocument();
    expect(document.querySelector('[name="transaction_date"]')).toBeInTheDocument();
    expect(document.querySelector('[name="amount"]')).toBeInTheDocument();
    expect(document.querySelector('[name="transaction_status"]')).toBeInTheDocument();
  });

  // Verify validation errors are displayed
  it('displays validation errors when touched', () => {
    const formik = getMockFormik({
      touched: { amount: true, customer_id: true },
      errors: { amount: 'Required', customer_id: 'Required' },
    });
    render(<TransactionForm formik={formik} customers={mockCustomers} pets={mockPets} />);
    
    expect(screen.getAllByText('Required')).toHaveLength(2);
    expect(document.querySelector('[name="amount"]')).toHaveClass('is-invalid');
  });

  // Verify handleChange is called when input changes
  it('calls handleChange on input change', () => {
    const formik = getMockFormik();
    render(<TransactionForm formik={formik} customers={mockCustomers} pets={mockPets} />);
    
    fireEvent.change(document.querySelector('[name="amount"]'), { target: { value: '100' } });
    expect(formik.handleChange).toHaveBeenCalled();
  }); 
});