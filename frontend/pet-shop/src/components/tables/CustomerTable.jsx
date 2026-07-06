import React, { useMemo } from "react";
import DataTable from "./DataTable";

const CustomerTable = ({ data, isLoading, refetch, openEdit, setDeleteId }) => {
	const columns = useMemo(
		() => [
			{ field: "id", headerName: "ID" },
			{ field: "first_name", headerName: "First Name", sortable: true },
			{ field: "last_name", headerName: "Last Name", sortable: true },
			{ field: "email", headerName: "Email", sortable: true },
			{ field: "phone_number", headerName: "Phone" },
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
			searchPlaceholder="Search customers..."
		/>
	);
};

export default React.memo(CustomerTable);
