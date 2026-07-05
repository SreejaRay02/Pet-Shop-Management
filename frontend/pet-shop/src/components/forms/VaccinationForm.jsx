import React from 'react';

// Form for adding or editing vaccination details
export default function VaccinationForm({ formik }) {
  return (
    <div className="row g-3">

      {/* Vaccination name */}
      <div className="col-xs-12">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={formik.values.name || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // Show validation only after the field is touched
            className={`form-control ${formik.touched.name && !!formik.errors.name ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">
            {formik.touched.name && formik.errors.name}
          </div>
        </div>
      </div>

      {/* Vaccination description */}
      <div className="col-xs-12">
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            rows={2}
            name="description"
            value={formik.values.description || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control"
          ></textarea>
        </div>
      </div>

      {/* Vaccination price */}
      <div className="col-xs-12">
        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formik.values.price || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // Highlight the field if there's a validation error
            className={`form-control ${formik.touched.price && !!formik.errors.price ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">
            {formik.touched.price && formik.errors.price}
          </div>
        </div>
      </div>

      {/* Availability toggle */}
      <div className="col-xs-12">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="vaccination-available-switch"
            name="available"
            checked={!!formik.values.available}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            className="form-check-label"
            htmlFor="vaccination-available-switch"
          >
            Available
          </label>
        </div>
      </div>

    </div>
  );
}