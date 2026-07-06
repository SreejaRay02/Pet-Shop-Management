import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import GroomingForm from '../../../src/components/forms/GroomingForm';

describe('GroomingForm Component', () => {
  // Create a mock Formik object for testing
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
    render(<GroomingForm formik={getMockFormik()} />);
    
    expect(document.querySelector('[name="name"]')).toBeInTheDocument();
    expect(document.querySelector('[name="description"]')).toBeInTheDocument();
    expect(document.querySelector('[name="price"]')).toBeInTheDocument();
    expect(document.querySelector('[name="available"]')).toBeInTheDocument();
  });

  // Verify validation errors are displayed
  it('displays validation errors when touched', () => {
    const formik = getMockFormik({
      touched: { name: true, price: true },
      errors: { name: 'Required', price: 'Required' },
    });

    render(<GroomingForm formik={formik} />);
    
    expect(screen.getAllByText('Required')[0]).toBeInTheDocument();
    expect(document.querySelector('[name="name"]')).toHaveClass('is-invalid');
  });

  // Verify checkbox state and change event
  it('handles checkbox toggle', () => {
    const formik = getMockFormik({
      values: { available: true },
    });
    render(<GroomingForm formik={formik} />);
    
    const checkbox = document.querySelector('[name="available"]');
    expect(checkbox).toBeChecked();
    
    fireEvent.click(checkbox);
    expect(formik.handleChange).toHaveBeenCalled();
  });
});