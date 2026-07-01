import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

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

  return (
    <Modal
      show={open}
      onHide={onClose}
      size={maxWidth === 'sm' ? 'sm' : maxWidth === 'lg' ? 'lg' : 'md'}
      centered
      backdrop="static" // Prevent clicking outside to close by default to avoid losing form data
    >
      {/* Modal Header */}
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{title}</Modal.Title>
      </Modal.Header>

      {/* Modal Body: This is where the form inputs will magically appear */}
      <Modal.Body className="py-4">
        {children}
      </Modal.Body>

      {/* Modal Footer: Cancel and Save buttons */}
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={loading} // Prevent clicking multiple times
          className="d-flex align-items-center gap-2"
        >
          {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
          {submitLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormModal;