import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import StatCard from '../../../src/components/cards/StatCard';

describe('StatCard Component', () => {
  // Default props used in multiple test cases
  const defaultProps = {
    title: 'Total Sales',
    value: '1,234',
  };

  // Reset all mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Clean up mocks after each test
  afterEach(() => {
    vi.clearAllMocks();
  }); 

  // Check if the card renders with the required props
  it('renders correctly with required props', () => {
    render(<StatCard {...defaultProps} />);
    
    // Verifies that the title is displayed on the screen.
    expect(screen.getByText('Total Sales')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  // Check if the subtitle is displayed
  it('renders subtitle if provided', () => {
    render(<StatCard {...defaultProps} subtitle="Last 30 days" />);
    expect(screen.getByText('Last 30 days')).toBeInTheDocument();
  });

  // Check if a Bootstrap icon is rendered
  it('renders bootstrap icon if icon is a string', () => {
    render(<StatCard {...defaultProps} icon="bi-cart" />);
    // Verify the Bootstrap icon exists
    const iconElement = document.querySelector('.bi-cart');
    expect(iconElement).toBeInTheDocument();
  });

  // Check if a custom React icon is rendered
  it('renders React component if icon is a component', () => {
    const CustomIcon = () => <div data-testid="custom-icon">Icon</div>;
    render(<StatCard {...defaultProps} icon={CustomIcon} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  // Verify the selected color class is applied
  it('applies custom color classes correctly', () => {
    render(<StatCard {...defaultProps} color="success" />);
    
    // Check the applied text color class
    const valueElement = screen.getByText('1,234');
    expect(valueElement).toHaveClass('text-success');
  });

  // Check the hover animation and shadow effect
  it('applies hover effects on mouse over and out', () => {
    render(<StatCard {...defaultProps} />);
    const card = screen.getByText('Total Sales').closest('.bg-primary');
    
    fireEvent.mouseOver(card);
    expect(card.style.transform).toBe('translateY(-4px)');
    expect(card.classList.contains('shadow')).toBe(true);

    fireEvent.mouseOut(card);
    expect(card.style.transform).toBe('none');
    expect(card.classList.contains('shadow')).toBe(false);
  });
});