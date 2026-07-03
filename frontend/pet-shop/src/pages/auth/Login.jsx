import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";

import { useAuthStore } from "../../stores/authStore";
import { loginSchema } from "../../validations/schemas";

export default function LoginPage() {
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const [showPw, setShowPw] = useState(false); // State to toggle password visibility
	const [error, setError] = useState(""); // State to hold login error messages

	const navigate = useNavigate(); // Navigate to URL
	const { login } = useAuthStore(); // Get the login function from global state

	useEffect(() => {
		if (successMessage || errorMessage) {
			const t = setTimeout(() => {
				setSuccessMessage("");
				setErrorMessage("");
			}, 3000);
			return () => clearTimeout(t);
		}
	}, [successMessage, errorMessage]);

	// Initialize Formik
	const formik = useFormik({
		initialValues: { email: "", password: "" },
		validationSchema: loginSchema,
		onSubmit: async ({ email, password }) => {
			try {
				setError("");
				const response = await login(email, password);
				const userRole = response.role;

				setSuccessMessage("Welcome back!");

				// Send the user to the correct page based on their role
				if (userRole === "Admin") {
					navigate("/admin/dashboard");
				} else if (userRole === "Supplier") {
					navigate("/supplier/dashboard");
				} else if (userRole === "Employee") {
					navigate("/employee/dashboard");
				} else {
					navigate("/customer/profile");
				}
			} catch (err) {
				setError(err?.response?.data || "Invalid email or password");
			}
		},
	});

	return (
		<div
			className="min-vh-100 d-flex align-items-center justify-content-center py-4"
			style={{
				background:
					"linear-gradient(135deg, rgba(108, 99, 255, 0.1) 0%, rgba(255, 101, 132, 0.1) 100%)",
			}}
		>
			<div className="container" style={{ maxWidth: "450px" }}>
				<div className="card border-0 shadow-lg rounded-4 p-4">
					<div className="card-body">
						<div className="text-center mb-4">
							<i
								className="bi bi-person-fill text-primary"
								style={{ fontSize: "5rem" }}
							></i>
							<h2 className="fw-bolder mt-2">Welcome Back!</h2>
							<p className="text-muted">
								Sign in to your PetShop account
							</p>
						</div>

						{error && (
							<div
								className="alert alert-danger py-2"
								role="alert"
							>
								{error}
							</div>
						)}

						<form
							className="d-flex flex-column gap-3"
							onSubmit={formik.handleSubmit}
						>
							<div className="mb-3">
								<label className="form-label fw-semibold">
									Email
								</label>
								<input
									className={`form-control ${formik.touched.email && !!formik.errors.email ? "is-invalid" : ""}`}
									type="email"
									name="email"
									value={formik.values.email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									placeholder="Enter your email"
								/>
								<div className="invalid-feedback">
									{formik.touched.email &&
										formik.errors.email}
								</div>
							</div>

							<div className="mb-3">
								<label className="form-label fw-semibold">
									Password
								</label>
								<div className="input-group">
									<input
										className={`form-control ${formik.touched.password && !!formik.errors.password ? "is-invalid" : ""}`}
										type={showPw ? "text" : "password"}
										name="password"
										value={formik.values.password}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										placeholder="Enter your password"
									/>
									<button
										type="button"
										className="btn btn-outline-secondary border-start-0"
										onClick={() => setShowPw(!showPw)}
										style={{
											borderColor:
												"var(--bs-border-color)",
										}}
									>
										<i
											className={
												showPw
													? "bi bi-eye-slash"
													: "bi bi-eye"
											}
										></i>
									</button>
									<div className="invalid-feedback">
										{formik.touched.password &&
											formik.errors.password}
									</div>
								</div>
							</div>

							<button
								className="btn btn-primary btn-lg fw-bold mt-2 d-flex justify-content-center align-items-center gap-2"
								type="submit"
								disabled={formik.isSubmitting}
							>
								{formik.isSubmitting ? (
									<>
										<span
											className="spinner-border spinner-border-sm"
											role="status"
											aria-hidden="true"
										></span>{" "}
										Signing in...
									</>
								) : (
									"Sign In"
								)}
							</button>
						</form>

						<div className="position-relative mt-4 text-center">
							<hr className="text-muted" />
							<span className="position-absolute top-50 start-50 translate-middle px-3 bg-body text-muted small">
								Demo Accounts
							</span>
						</div>

						<div className="d-flex flex-column gap-2 mt-4">
							{[
								{
									label: "Customer",
									email: "alice.johnson@example.com",
									pw: "admin123",
									variant: "outline-primary",
								},
								{
									label: "Admin",
									email: "admin@petshop.com",
									pw: "admin123",
									variant: "outline-warning",
								},
								{
									label: "Supplier",
									email: "supplier1@petshop.com",
									pw: "admin123",
									variant: "outline-success",
								},
								{
									label: "Employee",
									email: "employee1@petshop.com",
									pw: "admin123",
									variant: "outline-info",
								},
							].map(({ label, email, pw, variant }) => (
								<button
									className={`btn btn-${variant} btn-sm text-start`}
									key={label}
									onClick={() => {
										formik.setValues({
											email,
											password: pw,
										});
									}}
								>
									<strong>{label}:</strong> {email}
								</button>
							))}
						</div>

						<div className="text-center mt-4">
							<span className="text-muted">
								Don't have an account?{" "}
							</span>
							<Link
								className="text-primary fw-semibold text-decoration-none"
								to="/register"
							>
								Register here
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
