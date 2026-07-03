import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PetCard from '../../../src/components/cards/PetCard';

// Mock react-router-dom
const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock helper function
vi.mock('../../../src/utils/helpers', () => ({
  formatCurrency: (amount) => `$${amount}`,
}));

describe('PetCard Component', () => {
  const mockPet = {
    id: 1,
    name: 'Buddy',
    price: 150,
    breed: 'Golden Retriever',
    age: 2,
    description: 'Friendly dog',
    image_url: 'http://example.com/buddy.jpg',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders pet details successfully', () => {
    render(<PetCard pet={mockPet} showBuyButton={true} />);

    expect(screen.getByText('Buddy')).toBeInTheDocument();
    expect(screen.getByText('$150')).toBeInTheDocument();
    expect(
      screen.getByText('🐾 Golden Retriever • 2 yrs')
    ).toBeInTheDocument();
    expect(screen.getByText('Friendly dog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adopt now/i }))
      .toBeInTheDocument();
  });

  it('renders singular age correctly', () => {
    const pet = { ...mockPet, age: 1 };

    render(<PetCard pet={pet} />);

    expect(
      screen.getByText('🐾 Golden Retriever • 1 yr')
    ).toBeInTheDocument();
  });

  it('navigates to pet details page when card is clicked', () => {
    render(<PetCard pet={mockPet} />);

    const card = screen.getByText('Buddy').closest('.card');

    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/pets/1');
  });

  it('renders buy button only when showBuyButton is true', () => {
    const { rerender } = render(<PetCard pet={mockPet} />);

    expect(
      screen.queryByRole('button', { name: /adopt now/i })
    ).not.toBeInTheDocument();

    rerender(<PetCard pet={mockPet} showBuyButton={true} />);

    expect(
      screen.getByRole('button', { name: /adopt now/i })
    ).toBeInTheDocument();
  });

  it('calls onBuy when buy button is clicked', () => {
    const mockOnBuy = vi.fn();

    render(
      <PetCard
        pet={mockPet}
        showBuyButton={true}
        onBuy={mockOnBuy}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: /adopt now/i })
    );

    expect(mockOnBuy).toHaveBeenCalledTimes(1);
    expect(mockOnBuy).toHaveBeenCalledWith(mockPet);

    // stopPropagation prevents navigation
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('does not throw error when onBuy is not provided', () => {
    render(<PetCard pet={mockPet} showBuyButton={true} />);

    fireEvent.click(
      screen.getByRole('button', { name: /adopt now/i })
    );

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('uses placeholder image when image_url is missing', () => {
    const pet = {
      ...mockPet,
      image_url: null,
    };

    render(<PetCard pet={pet} />);

    const image = screen.getByAltText('Buddy');

    expect(image.src).toContain(
      'picsum.photos/seed/1/400/200'
    );
  });

  it('changes image to placeholder when image loading fails', () => {
    render(<PetCard pet={mockPet} />);

    const image = screen.getByAltText('Buddy');

    fireEvent.error(image);

    expect(image.src).toContain(
      'picsum.photos/seed/1/400/200'
    );
  });

  it('applies hover styles on mouse over and removes them on mouse out', () => {
    render(<PetCard pet={mockPet} />);

    const card = screen.getByText('Buddy').closest('.card');

    fireEvent.mouseOver(card);

    expect(card.style.transform).toBe('translateY(-6px)');
    expect(card).toHaveClass('shadow');

    fireEvent.mouseOut(card);

    expect(card.style.transform).toBe('none');
    expect(card).not.toHaveClass('shadow');
  });
});