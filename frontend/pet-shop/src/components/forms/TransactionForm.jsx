import React from 'react';

// Form for adding or editing a transaction
export default function TransactionForm({ formik, editItem, customers, pets }) {
  return (
    <div className="row g-3">

      {/* Select customer */}
      <div className="col-xs-12">
        <div className="mb-3">
          <label className="form-label">Customer</label>
          <select
            name="customer_id"
            value={formik.values.customer_id || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // Show validation only after the field is touched
            className={`form-select ${formik.touched.customer_id && !!formik.errors.customer_id ? 'is-invalid' : ''}`}
          >
            <option value="" disabled>Select a customer</option>

            {/* Populate customer list dynamically */}
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.first_name} {c.last_name}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">
            {formik.touched.customer_id && formik.errors.customer_id}
          </div>
        </div>
      </div>

      {/* Select pet */}
      <div className="col-xs-12">
        <div className="mb-3">
          <label className="form-label">Pet</label>
          <select
            name="pet_id"
            value={formik.values.pet_id || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-select ${formik.touched.pet_id && !!formik.errors.pet_id ? 'is-invalid' : ''}`}
          >
            <option value="" disabled>Select a pet</option>

            {/* Populate pet list dynamically */}
            {pets.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.breed})
              </option>
            ))}
          </select>
          <div className="invalid-feedback">
            {formik.touched.pet_id && formik.errors.pet_id}
          </div>
        </div>
      </div>

      {/* Transaction date */}
      <div className="col-xs-6">
        <div className="mb-3">
          <label className="form-label">Transaction Date</label>
          <input
            type="date"
            name="transaction_date"
            value={formik.values.transaction_date || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${formik.touched.transaction_date && !!formik.errors.transaction_date ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">
            {formik.touched.transaction_date && formik.errors.transaction_date}
          </div>
        </div>
      </div>

      {/* Transaction amount */}
      <div className="col-xs-6">
        <div className="mb-3">
          <label className="form-label">Amount (₹)</label>
          <input
            type="number"
            name="amount"
            value={formik.values.amount || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${formik.touched.amount && !!formik.errors.amount ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">
            {formik.touched.amount && formik.errors.amount}
          </div>
        </div>
      </div>

      {/* Select transaction status */}
      <div className="col-xs-12">
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="transaction_status"
            value={formik.values.transaction_status || 'Success'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-select ${formik.touched.transaction_status && !!formik.errors.transaction_status ? 'is-invalid' : ''}`}
          >
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
          </select>
          <div className="invalid-feedback">
            {formik.touched.transaction_status && formik.errors.transaction_status}
          </div>
        </div>
      </div>

    </div>
  );
}