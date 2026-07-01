import React from "react";

export default function CustomerForm({ formik, editItem, addresses }) {
	return (
		<div className="row g-3">
			<div className="col-6">
				<div className="mb-3">
					<label className="form-label">First Name</label>
					<input
						type="text"
						name="first_name"
						className={`form-control form-control-sm ${
							formik.touched.first_name &&
							formik.errors.first_name
								? "is-invalid"
								: ""
						}`}
						value={formik.values.first_name || ""}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<div className="invalid-feedback">
						{formik.touched.first_name && formik.errors.first_name}
					</div>
				</div>
			</div>

			<div className="col-6">
				<div className="mb-3">
					<label className="form-label">Last Name</label>
					<input
						type="text"
						name="last_name"
						className={`form-control form-control-sm ${
							formik.touched.last_name && formik.errors.last_name
								? "is-invalid"
								: ""
						}`}
						value={formik.values.last_name || ""}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<div className="invalid-feedback">
						{formik.touched.last_name && formik.errors.last_name}
					</div>
				</div>
			</div>

			<div className="col-12">
				<div className="mb-3">
					<label className="form-label">Email</label>
					<input
						type="email"
						name="email"
						className={`form-control form-control-sm ${
							formik.touched.email && formik.errors.email
								? "is-invalid"
								: ""
						}`}
						value={formik.values.email || ""}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<div className="invalid-feedback">
						{formik.touched.email && formik.errors.email}
					</div>
				</div>
			</div>

			<div className="col-12">
				<div className="mb-3">
					<label className="form-label">Phone Number</label>
					<input
						type="text"
						name="phone_number"
						className={`form-control form-control-sm ${
							formik.touched.phone_number &&
							formik.errors.phone_number
								? "is-invalid"
								: ""
						}`}
						value={formik.values.phone_number || ""}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<div className="invalid-feedback">
						{formik.touched.phone_number &&
							formik.errors.phone_number}
					</div>
				</div>
			</div>

			<div className="col-12">
				<div className="mb-3">
					<label className="form-label">Address</label>

					<select
						name="address_id"
						className={`form-select form-select-sm ${
							formik.touched.address_id &&
							formik.errors.address_id
								? "is-invalid"
								: ""
						}`}
						value={formik.values.address_id || ""}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					>
						<option value="">None</option>

						{addresses.map((a) => (
							<option key={a.id} value={a.id}>
								{a.street}, {a.city}
							</option>
						))}
					</select>

					<div className="invalid-feedback">
						{formik.touched.address_id && formik.errors.address_id}
					</div>
				</div>
			</div>
		</div>
	);
}
