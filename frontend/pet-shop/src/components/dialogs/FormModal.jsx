import React from 'react';

// FormModal component accepts props from its parent
const FormModal = (props) => {
  // Destructuring props to make them easier to use
  const {
    open,         // Boolean: is the modal visible?
    onClose,      // Function: runs when the user clicks cancel or X
    title,        // String: heading of the modal
    children,     // React Nodes: the actual form inputs placed inside
    onSubmit,     // Function: runs when user clicks Save
    submitLabel = 'Save', // String: Text on the save button (defaults to 'Save')
    loading = false,      // Boolean: shows a spinner if true
    maxWidth = 'md',      // String: controls how wide the modal is (sm, md, lg)
  } = props;

  if (!open) return null;

  return (
    <div className="modal d-block"  tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className={` ${`modal-dialog modal-${maxWidth === 'sm' ? 'sm' : maxWidth === 'lg' ? 'lg' : 'md'} modal-dialog-centered`}`.trim()} >
        <div className="modal-content" >
          {/* Modal Header */}
          <div className="modal-header" >
            <h5 className="modal-title fw-bold" >{title}</h5>
            <button className="btn-close" type="button"  onClick={onClose} aria-label="Close"></button>
          </div>

          {/* Modal Body: This is where the form inputs will magically appear */}
          <div className="modal-body py-4" >
            {children}
          </div>

          {/* Modal Footer: Cancel and Save buttons */}
          <div className="modal-footer" >
            <button className="btn btn-secondary"  onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button className="btn btn-primary d-flex align-items-center gap-2"  onClick={onSubmit} disabled={loading}>
              {loading && <div className="spinner-border spinner-border-sm"  role="status" aria-hidden="true"></div>}
              {submitLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
