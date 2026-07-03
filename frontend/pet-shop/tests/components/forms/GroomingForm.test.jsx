import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import GroomingForm from '../../../src/components/forms/GroomingForm';

describe('GroomingForm Component', () => {
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
    render(<GroomingForm formik={getMockFormik()} />);
    
    expect(document.querySelector('[name="name"]')).toBeInTheDocument();
    expect(document.querySelector('[name="description"]')).toBeInTheDocument();
    expect(document.querySelector('[name="price"]')).toBeInTheDocument();
    expect(document.querySelector('[name="available"]')).toBeInTheDocument();
  });

  it('displays validation errors when touched', () => {
    const formik = getMockFormik({
      touched: { name: true, price: true },
      errors: { name: 'Required', price: 'Required' },
    });
    render(<GroomingForm formik={formik} />);
    
    expect(screen.getAllByText('Required')[0]).toBeInTheDocument();
    expect(document.querySelector('[name="name"]')).toHaveClass('is-invalid');
  });

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
 