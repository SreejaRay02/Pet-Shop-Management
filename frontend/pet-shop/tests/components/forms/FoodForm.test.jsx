// Import React (required for JSX)
import React from 'react';

// Import functions used for testing React components
import { render, screen, fireEvent } from '@testing-library/react';

// Import Vitest functions
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Import the component that we want to test
import FoodForm from '../../../src/components/forms/FoodForm';

// Group all test cases related to FoodForm
describe('FoodForm Component', () => {

  // Function to create a fake Formik object
  // This avoids using the real Formik library during testing
  const getMockFormik = (overrides = {}) => ({
    
    // Initial form values
    values: {},

    // Tracks which fields have been visited
    touched: {},

    // Stores validation error messages
    errors: {},

    // Fake handleChange function
    // vi.fn() creates a mock function
    handleChange: vi.fn(),

    // Fake handleBlur function
    handleBlur: vi.fn(),

    // Replace default values with custom values if passed
    ...overrides,
  });

  // Runs before every test case
  // Clears history of all mock functions
  beforeEach(() => {
    vi.clearAllMocks();
  });


  // Test Case 1 (Check whether all form fields are rendered properly)
  it('renders all form fields successfully', () => {

    // Render the FoodForm component
    render(<FoodForm formik={getMockFormik()} />);

    // Check whether input with name="name" exists
    expect(document.querySelector('[name="name"]')).toBeInTheDocument();

    // Check Brand input
    expect(document.querySelector('[name="brand"]')).toBeInTheDocument();

    // Check Type dropdown
    expect(document.querySelector('[name="type"]')).toBeInTheDocument();

    // Check Quantity input
    expect(document.querySelector('[name="quantity"]')).toBeInTheDocument();

    // Check Price input
    expect(document.querySelector('[name="price"]')).toBeInTheDocument();
  });


  // Test Case 2 (Check whether validation errors are shown)
  it('displays validation errors when touched', () => {

    // Create fake Formik data with validation errors
    const formik = getMockFormik({

      // User has clicked these fields
      touched: {
        name: true,
        quantity: true,
      },

      // Validation error messages
      errors: {
        name: 'Name is required',
        quantity: 'Must be greater than 0',
      },
    });

    // Render component using fake Formik data
    render(<FoodForm formik={formik} />);

    // Check whether error message appears
    expect(screen.getByText('Name is required')).toBeInTheDocument();

    // Check second validation message
    expect(screen.getByText('Must be greater than 0')).toBeInTheDocument();

    // Check if Bootstrap invalid class is added
    expect(document.querySelector('[name="name"]'))
      .toHaveClass('is-invalid');
  });

  // Test Case 3
  // Check whether handleChange gets called
  // when user changes dropdown value
  it('calls handleChange on select change', () => {

    // Create fake Formik object
    const formik = getMockFormik();

    // Render component
    render(<FoodForm formik={formik} />);

    // Simulate selecting "Dry" from dropdown 
    fireEvent.change(
      document.querySelector('[name="type"]'),
      {
        target: {
          value: 'Dry',
        },
      }
    );

    // Verify that Formik's handleChange function was called
    expect(formik.handleChange).toHaveBeenCalled();
  });

});