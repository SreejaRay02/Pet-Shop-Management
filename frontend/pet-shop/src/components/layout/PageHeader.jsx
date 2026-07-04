import React from 'react';
import { useNavigate } from 'react-router-dom';

// The main header for pages (e.g. "Pets" title and "Add Pet" button)
export const PageHeader = React.memo((props) => {
  const { title, subtitle, action, actionLabel, actionIcon } = props;
  
  return (
    <div className="mb-4 d-flex align-items-start justify-content-between flex-wrap gap-3" >
      {/* Title section */}
      <div>
        <h2 className="fw-bolder mb-0" >{title}</h2>
        {subtitle && <p className="text-muted mt-1 mb-0 small" >{subtitle}</p>}
      </div>
      
      {/* Button section (only shows if 'action' function is provided) */}
      {action && (
        <button className="btn btn-primary shadow-sm d-flex align-items-center gap-2 fw-bold" onClick={action}  >
          {/* Support both string (bootstrap icons) and component icons */}
          {actionIcon && (typeof actionIcon === 'string' ? <i className={` ${`bi ${actionIcon}`}`.trim()} ></i> : React.createElement(actionIcon))}
          {actionLabel}
        </button>
      )}
    </div>
  );
});

// A reusable loading spinner
export const LoadingSpinner = React.memo((props) => {
  const { message = 'Loading...' } = props;
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-50 gap-3 py-5" >
      <div className="spinner-border text-primary"    style={{ width: '3rem', height: '3rem' }}  role="status"></div>
      <span className="text-muted" >{message}</span>
    </div>
  );
});