import React from "react";

export default function AddressForm({ formik }) {
	return (
		<div className="row g-3">
			<div className="col-12">
				<div className="mb-3">
					<label className="form-label">Street</label>

					<input
						className={`form-control ${
							formik.touched.street && !!formik.errors.street
								? "is-invalid"
								: ""
						}`}
						type="text"
						name="street"
						value={formik.values.street || ""}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>

					<div className="invalid-feedback">
						{formik.touched.street && formik.errors.street}
					</div>
				</div>
			</div>

			<div className="col-6">
				<div className="mb-3">
					<label className="form-label">City</label>

					<input
						className={`form-control ${
							formik.touched.city && !!formik.errors.city
								? "is-invalid"
								: ""
						}`}
						type="text"
						name="city"
						value={formik.values.city || ""}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>

					<div className="invalid-feedback">
						{formik.touched.city && formik.errors.city}
					</div>
				</div>
			</div>

			<div className="col-6">
				<div className="mb-3">
					<label className="form-label">State</label>

					<input
						className={`form-control ${
							formik.touched.state && !!formik.errors.state
								? "is-invalid"
								: ""
						}`}
						type="text"
						name="state"
						value={formik.values.state || ""}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>

					<div className="invalid-feedback">
						{formik.touched.state && formik.errors.state}
					</div>
				</div>
			</div>

			<div className="col-12">
				<div className="mb-3">
					<label className="form-label">Zip Code</label>

					<input
						className={`form-control ${
							formik.touched.zip_code && !!formik.errors.zip_code
								? "is-invalid"
								: ""
						}`}
						type="text"
						name="zip_code"
						value={formik.values.zip_code || ""}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>

					<div className="invalid-feedback">
						{formik.touched.zip_code && formik.errors.zip_code}
					</div>
				</div>
			</div>
		</div>
	);
}
