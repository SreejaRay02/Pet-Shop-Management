import React from 'react';

const ConfirmDialog = (props) => {
  const {
    open,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    message = 'Are you sure you want to proceed?',
    confirmLabel = 'Delete',
    loading = false,
  } = props;

  if (!open) return null;

  return (
    <div className="modal d-block"  tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-dialog-centered" >
        <div className="modal-content" >
          <div className="modal-header border-bottom-0 pb-0" >
            <h5 className="modal-title fw-bold d-flex align-items-center gap-2 text-danger fs-5" >
              <i className="bi bi-exclamation-triangle" ></i>
              {title}
            </h5>
            <button className="btn-close" type="button"  onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body py-3" >
            <p className="text-muted mb-0" >{message}</p>
          </div>
          <div className="modal-footer border-top-0 pt-0" >
            <button className="btn btn-secondary"  onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button className="btn btn-danger d-flex align-items-center gap-2"  onClick={onConfirm} disabled={loading}>
              {loading && <div className="spinner-border spinner-border-sm"  role="status" aria-hidden="true"></div>}
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;