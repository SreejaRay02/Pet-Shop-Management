import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CustomerForm from "../../../src/components/forms/CustomerForm";

vi.mock("../../../src/hooks/mutations/useAddressMutations", () => ({
	useCreateAddress: () => ({
		mutateAsync: vi.fn(),
		isPending: false,
	}),
}));

describe("CustomerForm Component", () => {
	const mockAddresses = [
		{ id: 1, street: "123 Main St", city: "NY" },
		{ id: 2, street: "456 Broad St", city: "LA" },
	];

	const getMockFormik = (overrides = {}) => ({
		values: {},
		touched: {},
		errors: {},
		handleChange: vi.fn(),
		handleBlur: vi.fn(),
		setFieldValue: vi.fn(),
		...overrides,
	});

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders all form fields successfully", () => {
		render(
			<CustomerForm formik={getMockFormik()} addresses={mockAddresses} />,
		);

		expect(
			document.querySelector('[name="first_name"]'),
		).toBeInTheDocument();
		expect(
			document.querySelector('[name="last_name"]'),
		).toBeInTheDocument();
		expect(document.querySelector('[name="email"]')).toBeInTheDocument();
		expect(
			document.querySelector('[name="phone_number"]'),
		).toBeInTheDocument();
		expect(
			document.querySelector('[name="address_id"]'),
		).toBeInTheDocument();
	});

	it("disables email input when emailEditable is false", () => {
		render(
			<CustomerForm
				formik={getMockFormik()}
				addresses={mockAddresses}
				emailEditable={false}
			/>,
		);
		expect(document.querySelector('[name="email"]')).toBeDisabled();
		expect(
			screen.getByText("Email address cannot be changed."),
		).toBeInTheDocument();
	});

	it("enables email input when emailEditable is true", () => {
		render(
			<CustomerForm
				formik={getMockFormik()}
				addresses={mockAddresses}
				emailEditable={true}
			/>,
		);
		expect(document.querySelector('[name="email"]')).not.toBeDisabled();
	});

	it("calls setFieldValue when address is selected", () => {
		const formik = getMockFormik();
		render(<CustomerForm formik={formik} addresses={mockAddresses} />);

		fireEvent.change(document.querySelector('[name="address_id"]'), {
			target: { value: "1" },
		});
		expect(formik.setFieldValue).toHaveBeenCalledWith("address_id", 1);
	});

	it("displays validation errors when touched", () => {
		const formik = getMockFormik({
			touched: { first_name: true },
			errors: { first_name: "First Name is required" },
		});
		render(<CustomerForm formik={formik} addresses={mockAddresses} />);

		expect(screen.getByText("First Name is required")).toBeInTheDocument();
		expect(document.querySelector('[name="first_name"]')).toHaveClass(
			"is-invalid",
		);
	});
});
