import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AddressTable from "../../../src/components/tables/AddressTable";

describe("AddressTable Component", () => {
	const mockData = [
		{
			id: 1,
			street: "123 Main",
			city: "NY",
			state: "NY",
			zip_code: "10001",
		},
	];

	const mockOpenEdit = vi.fn();
	const mockSetDeleteId = vi.fn();
	const mockRefetch = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders table columns correctly", () => {
		render(<AddressTable data={mockData} />);
		expect(screen.getByText("Street")).toBeInTheDocument();
		expect(screen.getByText("City")).toBeInTheDocument();
		expect(screen.getByText("State")).toBeInTheDocument();
		expect(screen.getByText("Zip Code")).toBeInTheDocument();
	});

	it("renders data correctly", () => {
		render(<AddressTable data={mockData} />);
		expect(screen.getByText("123 Main")).toBeInTheDocument();
		expect(screen.getByText("10001")).toBeInTheDocument();
	});

	it("calls openEdit when edit button is clicked", () => {
		render(<AddressTable data={mockData} openEdit={mockOpenEdit} />);
		const editButton = screen.getByTitle("Edit");
		fireEvent.click(editButton);
		expect(mockOpenEdit).toHaveBeenCalledWith(mockData[0]);
	});

	it("calls setDeleteId when delete button is clicked", () => {
		render(<AddressTable data={mockData} setDeleteId={mockSetDeleteId} />);
		const deleteButton = screen.getByTitle("Delete");
		fireEvent.click(deleteButton);
		expect(mockSetDeleteId).toHaveBeenCalledWith(1);
	});
});
