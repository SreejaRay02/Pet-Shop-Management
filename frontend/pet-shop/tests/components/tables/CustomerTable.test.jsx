import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CustomerTable from "../../../src/components/tables/CustomerTable";

describe("CustomerTable Component", () => {
	const mockData = [
		{
			id: 1,
			first_name: "John",
			last_name: "Doe",
			email: "john@test.com",
			phone_number: "123",
		},
	];

	const mockOpenEdit = vi.fn();
	const mockSetDeleteId = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders table columns correctly", () => {
		render(<CustomerTable data={mockData} />);
		expect(screen.getByText("First Name")).toBeInTheDocument();
		expect(screen.getByText("Last Name")).toBeInTheDocument();
		expect(screen.getByText("Email")).toBeInTheDocument();
		expect(screen.getByText("Phone")).toBeInTheDocument();
	});

	it("renders data correctly", () => {
		render(<CustomerTable data={mockData} />);
		expect(screen.getByText("John")).toBeInTheDocument();
		expect(screen.getByText("john@test.com")).toBeInTheDocument();
	});

	it("calls openEdit when edit button is clicked", () => {
		render(<CustomerTable data={mockData} openEdit={mockOpenEdit} />);
		const editButton = screen.getByTitle("Edit");
		fireEvent.click(editButton);
		expect(mockOpenEdit).toHaveBeenCalledWith(mockData[0]);
	});

	it("calls setDeleteId when delete button is clicked", () => {
		render(<CustomerTable data={mockData} setDeleteId={mockSetDeleteId} />);
		const deleteButton = screen.getByTitle("Delete");
		fireEvent.click(deleteButton);
		expect(mockSetDeleteId).toHaveBeenCalledWith(1);
	});
});
