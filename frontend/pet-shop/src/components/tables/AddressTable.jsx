import React, { useMemo } from "react";
import DataTable from "./DataTable";

const AddressTable = ({ data, isLoading, refetch, openEdit, setDeleteId }) => {
	const columns = useMemo(
		() => [
			{
				field: "id",
				headerName: "ID",
			},
			{
				field: "street",
				headerName: "Street",
				sortable: true,
			},
			{
				field: "city",
				headerName: "City",
				sortable: true,
			},
			{
				field: "state",
				headerName: "State",
				sortable: true,
			},
			{
				field: "zip_code",
				headerName: "Zip Code",
			},
			{
				field: "actions",
				headerName: "Actions",
				sortable: false,
				renderCell: (row) => (
					<div className="d-flex gap-2">
						<button
							className="btn btn-outline-primary btn-sm"
							title="Edit"
							onClick={() => openEdit(row)}
						>
							<i className="bi bi-pencil"></i>
						</button>

						<button
							className="btn btn-outline-danger btn-sm"
							title="Delete"
							onClick={() => setDeleteId(row.id)}
						>
							<i className="bi bi-trash"></i>
						</button>
					</div>
				),
			},
		],
		[openEdit, setDeleteId],
	);

	return (
		<DataTable
			columns={columns}
			data={data}
			loading={isLoading}
			onRefresh={refetch}
			searchPlaceholder="Search by city or state..."
		/>
	);
};

export default React.memo(AddressTable);
