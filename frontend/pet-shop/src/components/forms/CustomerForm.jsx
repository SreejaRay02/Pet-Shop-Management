import React from "react";

export default function CustomerForm({
	formik,
	addresses,
	emailEditable = true,
}) {
	return (
		<div className="row g-3">
			<div className="col-6">
				<div className="mb-3">
					<label className="form-label">First Name</label>
					<input
						className={`form-control ${
							formik.touched.first_name &&
							!!formik.errors.first_name
								? "is-invalid"
								: ""
						}`}
						type="text"
						name="first_name"
						value={formik.values.first_name || ""}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						size="sm"
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
						className={`form-control ${
							formik.touched.last_name &&
							!!formik.errors.last_name
								? "is-invalid"
								: ""
						}`}
						type="text"
						name="last_name"
						value={formik.values.last_name || ""}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						size="sm"
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
						className={`form-control ${
							formik.touched.email && !!formik.errors.email
								? "is-invalid"
								: ""
						}`}
						type="email"
						name="email"
						value={formik.values.email || ""}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						size="sm"
						disabled={!emailEditable}
					/>

					<div className="invalid-feedback">
						{formik.touched.email && formik.errors.email}
					</div>

					{!emailEditable && (
						<div className="form-text">
							Email address cannot be changed.
						</div>
					)}
				</div>
			</div>
			<div className="col-12">
				<div className="mb-3">
					<label className="form-label">Phone Number</label>
					<input
						className={` ${`form-control ${formik.touched.phone_number && !!formik.errors.phone_number ? "is-invalid" : ""}`}`.trim()}
						type="text"
						name="phone_number"
						value={formik.values.phone_number || ""}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						size="sm"
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
						className={` ${`form-select ${formik.touched.address_id && !!formik.errors.address_id ? "is-invalid" : ""}`}`.trim()}
						name="address_id"
						value={formik.values.address_id || ""}
						onChange={(e) =>
							formik.setFieldValue(
								"address_id",
								!!e.target.value
									? Number(e.target.value)
									: null,
							)
						}
						onBlur={formik.handleBlur}
						size="sm"
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
