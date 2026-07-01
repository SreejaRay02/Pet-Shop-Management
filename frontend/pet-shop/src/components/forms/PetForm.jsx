import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

export default function PetForm({ formik, editPet, categories }) {
  return (
    <Row className="g-3">
          <Col xs={12} sm={6}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
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
          <Col xs={12} sm={6}>
            <Form.Group>
              <Form.Label>Breed</Form.Label>
              <Form.Control 
                type="text" 
                name="breed"
                value={formik.values.breed || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.breed && !!formik.errors.breed} 
                size="sm" 
              />
              <Form.Control.Feedback type="invalid">{formik.touched.breed && formik.errors.breed}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} sm={6}>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control 
                type="number" 
                name="age"
                value={formik.values.age || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.age && !!formik.errors.age} 
                size="sm" 
              />
              <Form.Control.Feedback type="invalid">{formik.touched.age && formik.errors.age}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} sm={6}>
            <Form.Group>
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control 
                type="number" 
                name="price"
                value={formik.values.price || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.price && !!formik.errors.price} 
                size="sm" 
              />
              <Form.Control.Feedback type="invalid">{formik.touched.price && formik.errors.price}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select 
                name="category_id"
                value={formik.values.category_id || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.category_id && !!formik.errors.category_id}
                size="sm"
              >
                <option value="" disabled>Select a category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{formik.touched.category_id && formik.errors.category_id}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control 
                type="text" 
                name="image_url"
                value={formik.values.image_url || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.image_url && !!formik.errors.image_url} 
                size="sm" 
              />
              <Form.Control.Feedback type="invalid">{formik.touched.image_url && formik.errors.image_url}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="description"
                value={formik.values.description || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="sm" 
              />
            </Form.Group>
          </Col>
        </Row>
  );
}
