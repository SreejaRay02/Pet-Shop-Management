import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import FormModal from '../../../src/components/dialogs/FormModal';

describe('FormModal Component', () => {
  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    onSubmit: vi.fn((e) => e.preventDefault()),
    title: 'Test Modal',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when open is false', () => {
    const { container } = render(
      <FormModal {...defaultProps} open={false}>
        <div data-testid="child-content">Child Content</div>
      </FormModal>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders modal with title and children successfully', () => {
    render(
      <FormModal {...defaultProps}>
        <div data-testid="child-content">Child Content</div>
      </FormModal>
    );
    
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('renders custom submit label', () => {
    render(
      <FormModal {...defaultProps} submitLabel="Update">
        <div>Child</div>
      </FormModal>
    );
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
  });

  it('calls onClose when Cancel button is clicked', () => {
    render(
      <FormModal {...defaultProps}>
        <div>Child</div>
      </FormModal>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close icon (X) is clicked', () => {
    render(
      <FormModal {...defaultProps}>
        <div>Child</div>
      </FormModal>
    );
    fireEvent.click(screen.getByLabelText('Close'));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit when form is submitted', () => {
    render(
      <FormModal {...defaultProps}>
        <div>Child</div>
      </FormModal>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('disables buttons and shows spinner when loading is true', () => {
    render(
      <FormModal {...defaultProps} loading={true}>
        <div>Child</div>
      </FormModal>
    );
    
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    const submitButton = screen.getByRole('button', { name: 'Save' });
    
    expect(cancelButton).toBeDisabled();
    expect(submitButton).toBeDisabled();
    expect(document.querySelector('div.spinner-border')).toBeInTheDocument();
  });

  it('applies the correct max-width class based on maxWidth prop', () => {
    const { rerender } = render(
      <FormModal {...defaultProps} maxWidth="sm">
        <div>Child</div>
      </FormModal>
    );
    
    let dialog = screen.getByText('Test Modal').closest('.modal-dialog');
    expect(dialog).toHaveClass('modal-sm');

    rerender(
      <FormModal {...defaultProps} maxWidth="lg">
        <div>Child</div>
      </FormModal>
    );
    
    dialog = screen.getByText('Test Modal').closest('.modal-dialog');
    expect(dialog).toHaveClass('modal-lg');
  });
});
