import React from 'react';

export default function SupplierForm({ formik, editItem, addresses }) {
  return (
    <div className="row g-3" >
          <div className="col-12"  >
            <div className="mb-3" >
              <label className="form-label" >Supplier Name</label>
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
              <label className="form-label" >Contact Person</label>
              <input className={` ${`form-control ${formik.touched.contact_person && !!formik.errors.contact_person ? 'is-invalid' : ''}`}`.trim()} 
                type="text" 
                name="contact_person"
                value={formik.values.contact_person || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                 
                size="sm"  />
              <div className="invalid-feedback" >{formik.touched.contact_person && formik.errors.contact_person}</div>
            </div>
          </div>
          <div className="col-6"  >
            <div className="mb-3" >
              <label className="form-label" >Phone Number</label>
              <input className={` ${`form-control ${formik.touched.phone_number && !!formik.errors.phone_number ? 'is-invalid' : ''}`}`.trim()} 
                type="text" 
                name="phone_number"
                value={formik.values.phone_number || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                 
                size="sm"  />
              <div className="invalid-feedback" >{formik.touched.phone_number && formik.errors.phone_number}</div>
            </div>
          </div>
          <div className="col-6"  >
            <div className="mb-3" >
              <label className="form-label" >Email</label>
              <input className={` ${`form-control ${formik.touched.email && !!formik.errors.email ? 'is-invalid' : ''}`}`.trim()} 
                type="email" 
                name="email"
                value={formik.values.email || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                 
                size="sm"  />
              <div className="invalid-feedback" >{formik.touched.email && formik.errors.email}</div>
            </div>
          </div>
          <div className="col-12"  >
            <div className="mb-3" >
              <label className="form-label" >Address</label>
              <select className={` ${`form-select ${formik.touched.address_id && !!formik.errors.address_id ? 'is-invalid' : ''}`}`.trim()} 
                name="address_id"
                value={formik.values.address_id || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                
                size="sm"
                >
                <option value="">None</option>
                {addresses.map((a) => <option key={a.id} value={a.id}>{a.street}, {a.city}</option>)}
              </select>
              <div className="invalid-feedback" >{formik.touched.address_id && formik.errors.address_id}</div>
            </div>
          </div>
        </div>
  );
}
