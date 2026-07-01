import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// The main header for pages (e.g. "Pets" title and "Add Pet" button)
export const PageHeader = (props) => {
  const { title, subtitle, action, actionLabel, actionIcon } = props;
  
  return (
    <div className="mb-4 d-flex align-items-start justify-content-between flex-wrap gap-3">
      {/* Title section */}
      <div>
        <h2 className="fw-bolder mb-0">{title}</h2>
        {subtitle && <p className="text-muted mt-1 mb-0 small">{subtitle}</p>}
      </div>
      
      {/* Button section (only shows if 'action' function is provided) */}
      {action && (
        <Button
          variant="primary"
          onClick={action}
          className="shadow-sm d-flex align-items-center gap-2 fw-bold"
        >
          {/* Support both string (bootstrap icons) and component icons */}
          {actionIcon && (typeof actionIcon === 'string' ? <i className={`bi ${actionIcon}`}></i> : React.createElement(actionIcon))}
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

// A reusable loading spinner
export const LoadingSpinner = (props) => {
  const { message = 'Loading...' } = props;
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-50 gap-3 py-5">
      <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
      <span className="text-muted">{message}</span>
    </div>
  );
};
