import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

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

  return (
    <Modal show={open} onHide={onClose} size="sm" centered backdrop="static">
      {/* Header with Warning Icon */}
      <Modal.Header closeButton className="border-bottom-0 pb-0">
        <Modal.Title className="fw-bold d-flex align-items-center gap-2 text-danger fs-5">
          <i className="bi bi-exclamation-triangle"></i>
          {title}
        </Modal.Title>
      </Modal.Header>
      
      {/* Message Body */}
      <Modal.Body className="py-3">
        <p className="text-muted mb-0">{message}</p>
      </Modal.Body>
      
      {/* Buttons */}
      <Modal.Footer className="border-top-0 pt-0">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading} className="d-flex align-items-center gap-2">
          {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDialog;