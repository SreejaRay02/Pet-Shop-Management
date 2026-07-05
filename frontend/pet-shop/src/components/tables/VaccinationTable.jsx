import React, { useMemo } from "react";
import { formatCurrency } from "../../utils/helpers";
import DataTable from "./DataTable";

// Displays the vaccination list in a reusable table
const VaccinationTable = ({ data, isLoading, refetch, openEdit, setDeleteId }) => {

  // useMemo is used so the columns array is not recreated on every render
  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID" },
      { field: "name", headerName: "Vaccination Name", sortable: true },

      // Format price before displaying it
      { field: "price", headerName: "Price", sortable: true,
        renderCell: (r) => formatCurrency(r.price),
      },

      // Show availability with a colored badge
      { field: "available", headerName: "Status",
        renderCell: (r) => (
          <span className={` ${`badge bg-${r.available ? "success" : "danger"}`}`.trim()} >
            {r.available ? "Available" : "Unavailable"}
          </span>
        ),
      },

      { field: "actions", headerName: "Actions", sortable: false,

        // Action buttons for each vaccination
        renderCell: (row) => (
          <div className="d-flex gap-2">

            {/* Open edit form */}
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => openEdit(row)}
            >
              <i className="bi bi-pencil"></i>
            </button>

            {/* Open delete confirmation */}
            <button
              className="btn btn-outline-danger btn-sm"
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
      searchPlaceholder="Search vaccinations..."
    />
  );
};

// Prevent unnecessary re-renders when props don't change
export default React.memo(VaccinationTable);