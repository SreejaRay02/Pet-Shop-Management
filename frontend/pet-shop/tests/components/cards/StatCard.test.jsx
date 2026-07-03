import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import StatCard from '../../../src/components/cards/StatCard';

describe('StatCard Component', () => {
  const defaultProps = {
    title: 'Total Sales',
    value: '1,234',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  }); 

  it('renders correctly with required props', () => {
    render(<StatCard {...defaultProps} />);
    expect(screen.getByText('Total Sales')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('renders subtitle if provided', () => {
    render(<StatCard {...defaultProps} subtitle="Last 30 days" />);
    expect(screen.getByText('Last 30 days')).toBeInTheDocument();
  });

  it('renders bootstrap icon if icon is a string', () => {
    render(<StatCard {...defaultProps} icon="bi-cart" />);
    // Testing the existence of the icon by its class
    const iconElement = document.querySelector('.bi-cart');
    expect(iconElement).toBeInTheDocument();
  });

  it('renders React component if icon is a component', () => {
    const CustomIcon = () => <div data-testid="custom-icon">Icon</div>;
    render(<StatCard {...defaultProps} icon={CustomIcon} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('applies custom color classes correctly', () => {
    render(<StatCard {...defaultProps} color="success" />);
    
    // Test for text class
    const valueElement = screen.getByText('1,234');
    expect(valueElement).toHaveClass('text-success');
  });

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
