import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import VaccinationForm from '../../../src/components/forms/VaccinationForm';

describe('VaccinationForm Component', () => {
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
    render(<VaccinationForm formik={getMockFormik()} />);
    
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
    render(<VaccinationForm formik={formik} />);
    
    expect(screen.getAllByText('Required')).toHaveLength(2);
    expect(document.querySelector('[name="name"]')).toHaveClass('is-invalid');
  });

  it('handles checkbox toggle', () => {
    const formik = getMockFormik({
      values: { available: true },
    });
    render(<VaccinationForm formik={formik} />);
    
    const checkbox = document.querySelector('[name="available"]');
    expect(checkbox).toBeChecked();
    
    fireEvent.click(checkbox);
    expect(formik.handleChange).toHaveBeenCalled();
  });
});
 