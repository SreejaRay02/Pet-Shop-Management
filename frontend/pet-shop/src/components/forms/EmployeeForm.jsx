import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

export default function EmployeeForm({ formik, editItem, addresses }) {
  return (
    <Row className="g-3">
          <Col xs={6}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control 
                type="text" 
                name="first_name"
                value={formik.values.first_name || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.first_name && !!formik.errors.first_name} 
                size="sm" 
              />
              <Form.Control.Feedback type="invalid">
                {formik.touched.first_name && formik.errors.first_name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
                type="text" 
                name="last_name"
                value={formik.values.last_name || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.last_name && !!formik.errors.last_name} 
                size="sm" 
              />
              <Form.Control.Feedback type="invalid">
                {formik.touched.last_name && formik.errors.last_name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group>
              <Form.Label>Position</Form.Label>
              <Form.Control 
                type="text" 
                name="position"
                value={formik.values.position || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.position && !!formik.errors.position} 
                size="sm" 
              />
              <Form.Control.Feedback type="invalid">
                {formik.touched.position && formik.errors.position}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group>
              <Form.Label>Hire Date</Form.Label>
              <Form.Control 
                type="date" 
                name="hire_date"
                value={formik.values.hire_date || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.hire_date && !!formik.errors.hire_date} 
                size="sm" 
              />
              <Form.Control.Feedback type="invalid">
                {formik.touched.hire_date && formik.errors.hire_date}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control 
                type="text" 
                name="phone_number"
                value={formik.values.phone_number || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.phone_number && !!formik.errors.phone_number} 
                size="sm" 
              />
              <Form.Control.Feedback type="invalid">
                {formik.touched.phone_number && formik.errors.phone_number}
              </Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">
                {formik.touched.email && formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          
          <Col xs={6}>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Select 
                name="role"
                value={formik.values.role || 'Admin'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.role && !!formik.errors.role}
                size="sm"
              >
                <option value="Admin">Admin</option>
                <option value="Supplier">Supplier</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{formik.touched.role && formik.errors.role}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          
          <Col xs={6}>
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
                {addresses.map((a) => (
                  <option key={a.id} value={a.id}>{a.city}, {a.state}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{formik.touched.address_id && formik.errors.address_id}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
  );
}
