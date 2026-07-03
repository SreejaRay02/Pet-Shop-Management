import React from 'react';




export default function GroomingForm({ formik }) {
  return (
    <div className="row g-3" >
          <div className="col-12"  >
            <div className="mb-3" >
              <label className="form-label" >Service Name</label>
              <input className={` ${`form-control ${formik.touched.name && !!formik.errors.name ? 'is-invalid' : ''}`}`.trim()} 
                type="text" 
                name="name"
                value={formik.values.name || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                 
                size="sm"  />
              <div className="invalid-feedback" >{formik.touched.name && formik.errors.name}</div>
            </div>
          </div>
          <div className="col-12"  >
            <div className="mb-3" >
              <label className="form-label" >Description</label>
              <textarea className="form-control" 
                 
                rows={2} 
                name="description"
                value={formik.values.description || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="sm" 
               ></textarea>
            </div>
          </div>
          <div className="col-12"  >
            <div className="mb-3" >
              <label className="form-label" >Price (₹)</label>
              <input className={` ${`form-control ${formik.touched.price && !!formik.errors.price ? 'is-invalid' : ''}`}`.trim()} 
                type="number" 
                name="price"
                value={formik.values.price || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                 
                size="sm"  />
              <div className="invalid-feedback" >{formik.touched.price && formik.errors.price}</div>
            </div>
          </div>
          <div className="col-12"  >
            
<div className="form-check form-switch" >
  <input className="form-check-input" 
              type="checkbox" role="switch" 
              id="custom-switch" 
               
              name="available"
              checked={!!formik.values.available} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              />
  <label className="form-check-label"  htmlFor="custom-switch">Available</label>
</div>

          </div>
        </div>
  );
}
