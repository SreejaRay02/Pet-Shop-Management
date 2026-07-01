import React from 'react';




export default function GroomingForm({ formik }) {
  return (
    <div className="row g-3">
          <div className="col-xs-12" >
            <div className="mb-3">
              <label className="form-label">Service Name</label>
              <input 
                type="text" 
                name="name"
                value={formik.values.name || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                 
                size="sm" className={`form-control ${formik.touched.name && !!formik.errors.name ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{formik.touched.name && formik.errors.name}</div>
            </div>
          </div>
          <div className="col-xs-12" >
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea 
                 
                rows={2} 
                name="description"
                value={formik.values.description || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="sm" 
               className="form-control"></textarea>
            </div>
          </div>
          <div className="col-xs-12" >
            <div className="mb-3">
              <label className="form-label">Price (₹)</label>
              <input 
                type="number" 
                name="price"
                value={formik.values.price || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                 
                size="sm" className={`form-control ${formik.touched.price && !!formik.errors.price ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{formik.touched.price && formik.errors.price}</div>
            </div>
          </div>
          <div className="col-xs-12" >
            <input 
              type="switch" 
              id="custom-switch" 
              label="Available" 
              name="available"
              checked={!!formik.values.available} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
             className="form-check-input" />
          </div>
        </div>
  );
}
