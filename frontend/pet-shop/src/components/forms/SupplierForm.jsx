import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

export default function SupplierForm({ formik, editItem, addresses }) {
  return (
    <Row className="g-3">
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Supplier Name</Form.Label>
              <Form.Control 
                type="text" 
                name="name"
                value={formik.values.name || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.name && !!formik.errors.name} 
                size="sm" 
              />
              <Form.Control.Feedback type="invalid">{formik.touched.name && formik.errors.name}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Contact Person</Form.Label>
              <Form.Control 
                type="text" 
                name="contact_person"
                value={formik.values.contact_person || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.contact_person && !!formik.errors.contact_person} 
                size="sm" 
              />
              <Form.Control.Feedback type="invalid">{formik.touched.contact_person && formik.errors.contact_person}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
                type="text" 
                name="phone_number"
                value={formik.values.phone_number || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.phone_number && !!formik.errors.phone_number} 
                size="sm" 
              />
              <Form.Control.Feedback type="invalid">{formik.touched.phone_number && formik.errors.phone_number}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email"
                value={formik.values.email || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.email && !!formik.errors.email} 
                size="sm" 
              />
              <Form.Control.Feedback type="invalid">{formik.touched.email && formik.errors.email}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Select 
                name="address_id"
                value={formik.values.address_id || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.address_id && !!formik.errors.address_id}
                size="sm"
              >
                <option value="">None</option>
                {addresses.map((a) => <option key={a.id} value={a.id}>{a.street}, {a.city}</option>)}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{formik.touched.address_id && formik.errors.address_id}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
  );
}
