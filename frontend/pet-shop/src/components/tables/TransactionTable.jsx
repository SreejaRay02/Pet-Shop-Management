import React, { useMemo } from "react";
import { formatCurrency, formatDate, statusColor } from "../../utils/helpers";
import DataTable from "./DataTable";

// Displays the transaction list in a reusable table
const TransactionTable = ({
  data,
  isLoading,
  refetch,
  customers = [],
  pets = [],
  openEdit,
  adminView = true,
}) => {
  // Convert helper colors to Bootstrap badge colors
  const getBadgeBg = (status) => {
    const color = statusColor(status);
    if (color === "error") return "danger";
    if (color === "default") return "secondary";
    return color;
  };

  // useMemo is used so the columns array is not recreated on every render
  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID" },

      // Show customer details only in admin view
      ...(adminView
        ? [
            {
              field: "customer_id",
              headerName: "Customer",
              renderCell: (row) => {
                // Find the matching customer using the customer ID
                const customer = customers.find(
                  (c) => String(c.id) === String(row.customer_id),
                );

                // Display the customer name, or fall back to the ID
                return customer
                  ? `${customer.first_name} ${customer.last_name}`
                  : `#${row.customer_id}`;
              },
            },
          ]
        : []),

      {
        field: "pet_id",
        headerName: "Pet",
        renderCell: (row) => {
          // Find the matching pet using the pet ID
          const pet = pets.find((p) => String(p.id) === String(row.pet_id));

          return pet ? pet.name : `#${row.pet_id}`;
        },
      },

      // Format the transaction date before displaying it
      {
        field: "transaction_date",
        headerName: "Date",
        sortable: true,
        renderCell: (row) => formatDate(row.transaction_date),
      },

      // Format the amount as currency
      {
        field: "amount",
        headerName: "Amount",
        sortable: true,
        renderCell: (row) => formatCurrency(row.amount),
      },

      // Show the transaction status with a colored badge
      {
        field: "transaction_status",
        headerName: "Status",
        renderCell: (row) => (
          <span className={`badge bg-${getBadgeBg(row.transaction_status)}`}>
            {row.transaction_status}
          </span>
        ),
      },

      // Show edit action only for admin users
      ...(adminView
        ? [
            {
              field: "actions",
              headerName: "Actions",
              sortable: false,
              renderCell: (row) => (
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => openEdit(row)}
                >
                  <i className="bi bi-pencil"></i>
                </button>
              ),
            },
          ]
        : []),
    ],
    [adminView, customers, pets, openEdit],
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={isLoading}
      onRefresh={refetch}
      searchPlaceholder="Search transactions..."
      defaultOrderBy="id"
      defaultOrder="desc"
    />
  );
};

// Prevent unnecessary re-renders when props don't change
export default React.memo(TransactionTable);
