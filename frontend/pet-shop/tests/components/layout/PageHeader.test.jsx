import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PageHeader, LoadingSpinner } from '../../../src/components/layout/PageHeader';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('PageHeader Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders title successfully', () => {
    render(<PageHeader title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<PageHeader title="Test Title" subtitle="Test Subtitle" />);
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders action button and triggers action on click', () => {
    const actionSpy = vi.fn();
    render(<PageHeader title="Title" action={actionSpy} actionLabel="Add Item" />);
    
    const button = screen.getByRole('button', { name: /add item/i });
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(actionSpy).toHaveBeenCalledTimes(1);
  });

  it('renders string action icon correctly', () => {
    render(<PageHeader title="Title" action={vi.fn()} actionLabel="Add Item" actionIcon="bi-plus" />);
    const icon = document.querySelector('.bi-plus');
    expect(icon).toBeInTheDocument();
  });

  it('renders component action icon correctly', () => {
    const CustomIcon = () => <span data-testid="custom-icon">Icon</span>;
    render(<PageHeader title="Title" action={vi.fn()} actionLabel="Add Item" actionIcon={CustomIcon} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});

describe('LoadingSpinner Component', () => {
  it('renders with default message', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders with custom message', () => {
    render(<LoadingSpinner message="Fetching data..." />);
    expect(screen.getByText('Fetching data...')).toBeInTheDocument();
  });
});
