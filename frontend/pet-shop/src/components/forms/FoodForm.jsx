import React from 'react';

// Available food types shown in the dropdown
const FOOD_TYPES = ['Dry', 'Wet', 'Flakes', 'Pellets', 'Hay', 'Other'];

// Form used for both adding and editing pet food
export default function FoodForm({ formik, editItem }) {
  return (
    <div className="row g-3">

      {/* Food name */}
      <div className="col-xs-12">
        <div className="mb-3">
          <label className="form-label">Food Name</label>
          <input
            type="text"
            name="name"
            value={formik.values.name || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

            // Show a red border if the field has an error after being touched
            className={`form-control ${formik.touched.name && !!formik.errors.name ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">
            {formik.touched.name && formik.errors.name}
          </div>
        </div>
      </div>

      {/* Food brand */}
      <div className="col-xs-6">
        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input
            type="text"
            name="brand"
            value={formik.values.brand || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

            className={`form-control ${formik.touched.brand && !!formik.errors.brand ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">
            {formik.touched.brand && formik.errors.brand}
          </div>
        </div>
      </div>

      {/* Food type dropdown */}
      <div className="col-xs-6">
        <div className="mb-3">
          <label className="form-label">Type</label>
          <select
            name="type"
            value={formik.values.type || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

            className={`form-select ${formik.touched.type && !!formik.errors.type ? 'is-invalid' : ''}`}
          >
            <option value="" disabled>Select a type</option>

            {/* Create a dropdown option for each food type */}
            {FOOD_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">
            {formik.touched.type && formik.errors.type}
          </div>
        </div>
      </div>

      {/* Available quantity */}
      <div className="col-xs-6">
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formik.values.quantity || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

            className={`form-control ${formik.touched.quantity && !!formik.errors.quantity ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
        </div>
      </div>

      {/* Food price */}
      <div className="col-xs-6">
        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formik.values.price || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

            className={`form-control ${formik.touched.price && !!formik.errors.price ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">
            {formik.touched.price && formik.errors.price}
          </div>
        </div>
      </div>

    </div>
  );
}