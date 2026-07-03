import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AddressForm from "../../../src/components/forms/AddressForm";

describe("AddressForm Component", () => {
	const getMockFormik = (overrides = {}) => ({
		values: {},
		touched: {},
		errors: {},
		handleChange: vi.fn(),
		handleBlur: vi.fn(),
		...overrides,
	});

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders all form fields successfully", () => {
		render(<AddressForm formik={getMockFormik()} />);

		expect(document.querySelector('[name="street"]')).toBeInTheDocument();
		expect(document.querySelector('[name="city"]')).toBeInTheDocument();
		expect(document.querySelector('[name="state"]')).toBeInTheDocument();
		expect(document.querySelector('[name="zip_code"]')).toBeInTheDocument();
	});

	it("displays values from formik", () => {
		const formik = getMockFormik({
			values: {
				street: "123 Main St",
				city: "New York",
				state: "NY",
				zip_code: "10001",
			},
		});
		render(<AddressForm formik={formik} />);

		expect(document.querySelector('[name="street"]')).toHaveValue(
			"123 Main St",
		);
		expect(document.querySelector('[name="city"]')).toHaveValue("New York");
		expect(document.querySelector('[name="state"]')).toHaveValue("NY");
		expect(document.querySelector('[name="zip_code"]')).toHaveValue(
			"10001",
		);
	});

	it("calls handleChange on input change", () => {
		const formik = getMockFormik();
		render(<AddressForm formik={formik} />);

		fireEvent.change(document.querySelector('[name="street"]'), {
			target: { value: "456 Broad St" },
		});
		expect(formik.handleChange).toHaveBeenCalled();
	});

	it("displays validation errors when touched", () => {
		const formik = getMockFormik({
			touched: { street: true, city: true },
			errors: { street: "Street is required", city: "City is required" },
		});
		render(<AddressForm formik={formik} />);

		expect(screen.getByText("Street is required")).toBeInTheDocument();
		expect(screen.getByText("City is required")).toBeInTheDocument();
		expect(document.querySelector('[name="street"]')).toHaveClass(
			"is-invalid",
		);
	});
});
