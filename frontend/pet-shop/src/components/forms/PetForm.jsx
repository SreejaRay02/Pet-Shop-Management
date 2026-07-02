import React from 'react';

export default function PetForm({ formik, editPet, categories }) {
  return (
    <div className="row g-3" >
          <div className="col-12 col-sm-6"  >
            <div className="mb-3" >
              <label className="form-label" >Name</label>
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
          <div className="col-12 col-sm-6"  >
            <div className="mb-3" >
              <label className="form-label" >Breed</label>
              <input className={` ${`form-control ${formik.touched.breed && !!formik.errors.breed ? 'is-invalid' : ''}`}`.trim()} 
                type="text" 
                name="breed"
                value={formik.values.breed || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                 
                size="sm"  />
              <div className="invalid-feedback" >{formik.touched.breed && formik.errors.breed}</div>
            </div>
          </div>
          <div className="col-12 col-sm-6"  >
            <div className="mb-3" >
              <label className="form-label" >Age</label>
              <input className={` ${`form-control ${formik.touched.age && !!formik.errors.age ? 'is-invalid' : ''}`}`.trim()} 
                type="number" 
                name="age"
                value={formik.values.age || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                 
                size="sm"  />
              <div className="invalid-feedback" >{formik.touched.age && formik.errors.age}</div>
            </div>
          </div>
          <div className="col-12 col-sm-6"  >
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
            <div className="mb-3" >
              <label className="form-label" >Category</label>
              <select className={` ${`form-select ${formik.touched.category_id && !!formik.errors.category_id ? 'is-invalid' : ''}`}`.trim()} 
                name="category_id"
                value={formik.values.category_id || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                
                size="sm"
                >
                <option value="" disabled>Select a category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <div className="invalid-feedback" >{formik.touched.category_id && formik.errors.category_id}</div>
            </div>
          </div>
          
          <div className="col-12"  >
            <div className="mb-3" >
              <label className="form-label" >Image URL</label>
              <input className={` ${`form-control ${formik.touched.image_url && !!formik.errors.image_url ? 'is-invalid' : ''}`}`.trim()} 
                type="text" 
                name="image_url"
                value={formik.values.image_url || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                 
                size="sm"  />
              <div className="invalid-feedback" >{formik.touched.image_url && formik.errors.image_url}</div>
            </div>
          </div>
          <div className="col-12"  >
            <div className="mb-3" >
              <label className="form-label" >Description</label>
              <textarea className="form-control" 
                 
                rows={3} 
                name="description"
                value={formik.values.description || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="sm" 
               ></textarea>
            </div>
          </div>
        </div>
  );
}
