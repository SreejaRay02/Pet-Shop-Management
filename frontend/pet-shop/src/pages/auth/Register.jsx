import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { registerSchema } from "../../validations/schemas";

export default function RegisterPage() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const [showWelcome, setShowWelcome] = useState(false);
  const [registeredName, setRegisteredName] = useState("");
  const [registeredRole, setRegisteredRole] = useState(null);

  const navigate = useNavigate(); // Navigate to URL
  const { register } = useAuthStore(); // Get the register function from global store

  useEffect(() => {
    if (successMessage || errorMessage) {
      const t = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [successMessage, errorMessage]);

  // Setup Formik
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role: "Customer",
    },
    validationSchema: registerSchema,
    onSubmit: async (data) => {
      try {
        setError("");

        // Send data to API
        await register(data);

        setRegisteredName(data.username);
        setRegisteredRole(data.role);
        setShowWelcome(true);
      } catch (err) {
        setError(
          err?.response?.data ||
            "Registration failed. Email may already be in use.",
        );
      }
    },
  });

  const handleContinue = () => {
    setShowWelcome(false);
    if (registeredRole === "Admin") navigate("/admin/dashboard");
    else if (registeredRole === "Supplier") navigate("/supplier/dashboard");
    else navigate("/customer/profile");
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(108, 99, 255, 0.1) 0%, rgba(255, 101, 132, 0.1) 100%)",
      }}
    >
      {showWelcome && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center p-4">
              <div className="modal-body">
                <h2 className="mb-3">🎉</h2>
                <h4 className="fw-bold mb-3">
                  Welcome to Pet Shop Management, {registeredName}!
                </h4>
                <p className="text-muted mb-4">
                  Your account has been created successfully.
                </p>
                <button
                  className="btn btn-primary w-100"
                  onClick={handleContinue}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container" style={{ maxWidth: "450px" }}>
        <div className="card border-0 shadow-lg rounded-4 p-4">
          <div className="card-body">
            <div className="text-center mb-4">
              <i
                className="bi bi-person-fill text-primary"
                style={{ fontSize: "5rem" }}
              ></i>
              <h2 className="fw-bolder mt-2">Create Account</h2>
              <p className="text-muted">Join the PetShop community</p>
            </div>

            {error && (
              <div className="alert alert-danger py-2" role="alert">
                {error}
              </div>
            )}

            <form
              className="d-flex flex-column gap-3"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-3">
                <label className="form-label fw-semibold">Username</label>
                <input
                  className={` ${`form-control ${formik.touched.username && !!formik.errors.username ? "is-invalid" : ""}`}`.trim()}
                  type="text"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Choose a username"
                />
                <div className="invalid-feedback">
                  {formik.touched.username && formik.errors.username}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  className={` ${`form-control ${formik.touched.email && !!formik.errors.email ? "is-invalid" : ""}`}`.trim()}
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your email"
                />
                <div className="invalid-feedback">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>

                <div className="input-group">
                  <input
                    className={`form-control ${
                      formik.touched.password && !!formik.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
                    type={showPw ? "text" : "password"}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Create a password"
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary border-start-0"
                    onClick={() => setShowPw(!showPw)}
                    style={{
                      borderColor: "var(--bs-border-color)",
                    }}
                  >
                    <i className={showPw ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                  </button>

                  <div className="invalid-feedback">
                    {formik.touched.password && formik.errors.password}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Role</label>
                <select
                  className={` ${`form-select ${formik.touched.role && !!formik.errors.role ? "is-invalid" : ""}`}`.trim()}
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="Customer">Customer</option>
                  <option value="Supplier">Supplier</option>
                </select>
                <div className="invalid-feedback">
                  {formik.touched.role && formik.errors.role}
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
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="text-center mt-4">
              <span className="text-muted">Already have an account? </span>
              <Link
                className="text-primary fw-semibold text-decoration-none"
                to="/login"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
