import React from 'react';

// Form component used to add or edit a grooming service
export default function GroomingForm({ formik }) {
  return (
    <div className="row g-3">

      {/* Service Name */}
      <div className="col-12">
        <div className="mb-3">
          <label className="form-label">Service Name</label>

          <input
            className={`${`form-control ${
              formik.touched.name && !!formik.errors.name
                ? 'is-invalid'
                : ''
            }`}`.trim()}
            type="text"
            name="name"
            value={formik.values.name || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="sm"
          />

          {/* Show validation message only after the user has interacted with the field */}
          <div className="invalid-feedback">
            {formik.touched.name && formik.errors.name}
          </div>
        </div>
      </div>

      {/* Description of the grooming service */}
      <div className="col-12">
        <div className="mb-3">
          <label className="form-label">Description</label>

          <textarea
            className="form-control"
            rows={2}
            name="description"
            value={formik.values.description || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="sm"
          ></textarea>
        </div>
      </div>

      {/* Price of the service */}
      <div className="col-12">
        <div className="mb-3">
          <label className="form-label">Price (₹)</label>

          <input
            className={`${`form-control ${
              formik.touched.price && !!formik.errors.price
                ? 'is-invalid'
                : ''
            }`}`.trim()}
            type="number"
            name="price"
            value={formik.values.price || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="sm"
          />

          {/* Display error if the entered price is invalid */}
          <div className="invalid-feedback">
            {formik.touched.price && formik.errors.price}
          </div>
        </div>
      </div>

      {/* Switch to mark whether the service is currently available */}
      <div className="col-12">
        <div className="form-check form-switch">

          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="custom-switch"
            name="available"
            checked={!!formik.values.available}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <label className="form-check-label" htmlFor="custom-switch">
            Available
          </label>

        </div>
      </div>

    </div>
  );
}