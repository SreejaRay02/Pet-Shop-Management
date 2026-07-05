import React, { useMemo } from "react";
import { formatCurrency, formatDate, statusColor } from "../../utils/helpers";
import DataTable from "./DataTable";

const TransactionTable = ({
  data,
  isLoading,
  refetch,
  customers = [],
  pets = [],
  openEdit,
  adminView = true,
}) => {
  const getBadgeBg = (status) => {
    const color = statusColor(status);
    if (color === "error") return "danger";
    if (color === "default") return "secondary";
    return color;
  };

  const columns = useMemo(() => [
    { field: "id", headerName: "ID" },

    ...(adminView
      ? [
          {
            field: "customer_id",
            headerName: "Customer",
            renderCell: (row) => {
              const customer = customers.find(
                (c) => String(c.id) === String(row.customer_id),
              );

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
        const pet = pets.find(
          (p) => String(p.id) === String(row.pet_id),
        );

        return pet ? pet.name : `#${row.pet_id}`;
      },
    },

    {
      field: "transaction_date",
      headerName: "Date",
      sortable: true,
      renderCell: (row) => formatDate(row.transaction_date),
    },

    {
      field: "amount",
      headerName: "Amount",
      sortable: true,
      renderCell: (row) => formatCurrency(row.amount),
    },

    {
      field: "transaction_status",
      headerName: "Status",
      renderCell: (row) => (
        <span
          className={`badge bg-${getBadgeBg(row.transaction_status)}`}
        >
          {row.transaction_status}
        </span>
      ),
    },

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
  ], [adminView, customers, pets, openEdit]);

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

export default React.memo(TransactionTable);