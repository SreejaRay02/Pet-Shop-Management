import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FoodForm from '../../../src/components/forms/FoodForm';

// Group all test cases for the FoodForm component
describe('FoodForm Component', () => {

  // Create a mock Formik object for testing
  const getMockFormik = (overrides = {}) => ({
    
    // Default form values
    values: {},

    // Tracks touched fields
    touched: {},

    // Holds validation errors
    errors: {},

    // Mock change handler
    handleChange: vi.fn(),

    // Mock blur handler
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

    // Render the form component
    render(<FoodForm formik={getMockFormik()} />);

    // Check that all input fields exist
    expect(document.querySelector('[name="name"]')).toBeInTheDocument();
    expect(document.querySelector('[name="brand"]')).toBeInTheDocument();
    expect(document.querySelector('[name="type"]')).toBeInTheDocument();
    expect(document.querySelector('[name="quantity"]')).toBeInTheDocument();
    expect(document.querySelector('[name="price"]')).toBeInTheDocument();
  });


  // Verify validation errors are displayed
  it('displays validation errors when touched', () => {

    // Mock Formik with touched fields and errors
    const formik = getMockFormik({

      // Mark these fields as touched
      touched: {
        name: true,
        quantity: true,
      },

      // Validation messages
      errors: {
        name: 'Name is required',
        quantity: 'Must be greater than 0',
      },
    });

    // Render the form with validation errors
    render(<FoodForm formik={formik} />);

    // Check the validation message
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Must be greater than 0')).toBeInTheDocument();

    // Verify the invalid Bootstrap class is applied
    expect(document.querySelector('[name="name"]'))
      .toHaveClass('is-invalid');
  });

  // Verify handleChange is called on dropdown change
  it('calls handleChange on select change', () => {

    // Create a mock Formik object
    const formik = getMockFormik();

    // Render the form
    render(<FoodForm formik={formik} />);

    // Simulate changing the food type
    fireEvent.change(
      document.querySelector('[name="type"]'),
      {
        target: {
          value: 'Dry',
        },
      }
    );

    // Verify the change handler is called
    expect(formik.handleChange).toHaveBeenCalled();
  });

});