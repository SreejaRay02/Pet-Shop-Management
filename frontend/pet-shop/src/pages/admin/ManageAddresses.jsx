import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

import AddressTable from "../../components/tables/AddressTable";
import FormModal from "../../components/dialogs/FormModal";
import ConfirmDialog from "../../components/dialogs/ConfirmDialog";
import { PageHeader } from "../../components/layout/PageHeader";
import AddressForm from "../../components/forms/AddressForm";
import { useAddresses } from "../../hooks/queries/useAddresses";
import {
	useCreateAddress,
	useUpdateAddress,
	useDeleteAddress,
} from "../../hooks/mutations/useAddressMutations";
import { addressSchema } from "../../validations/schemas";

export default function ManageAddresses() {
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if (successMessage || errorMessage) {
			const t = setTimeout(() => {
				setSuccessMessage("");
				setErrorMessage("");
			}, 3000);

			return () => clearTimeout(t);
		}
	}, [successMessage, errorMessage]);

	const [modalOpen, setModalOpen] = useState(false);
	const [editItem, setEditItem] = useState(null);
	const [deleteId, setDeleteId] = useState(null);

	const { data = [], isLoading, refetch } = useAddresses();

	const create = useCreateAddress();
	const update = useUpdateAddress();
	const remove = useDeleteAddress();

	const formik = useFormik({
		enableReinitialize: true,

		initialValues: {
			street: editItem?.street || "",
			city: editItem?.city || "",
			state: editItem?.state || "",
			zip_code: editItem?.zip_code || "",
		},

		validationSchema: addressSchema,

		onSubmit: async (values) => {
			try {
				if (editItem) {
					await update.mutateAsync({
						id: editItem.id,
						data: values,
					});
					setSuccessMessage("Address updated successfully!");
				} else {
					await create.mutateAsync(values);
					setSuccessMessage("Address created successfully!");
				}
				setModalOpen(false);
				setEditItem(null);
				formik.resetForm();
			} catch (err) {
				setErrorMessage(
					err?.response?.data ||
						"Operation failed. Please try again.",
				);
			}
		},
	});

	const openCreate = () => {
		setEditItem(null);
		formik.resetForm();
		setModalOpen(true);
	};

	const openEdit = (item) => {
		setEditItem(item);
		formik.setTouched({});
		formik.setErrors({});
		setModalOpen(true);
	};

	const columns = [
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
						onClick={() => openEdit(row)}
					>
						<i className="bi bi-pencil"></i>
					</button>

					<button
						className="btn btn-outline-danger btn-sm"
						onClick={() => setDeleteId(row.id)}
					>
						<i className="bi bi-trash"></i>
					</button>
				</div>
			),
		},
	];

	return (
		<div className="container p-0">
			{successMessage && (
				<div className="alert alert-success m-3">{successMessage}</div>
			)}

			{errorMessage && (
				<div className="alert alert-danger m-3">{errorMessage}</div>
			)}

			<PageHeader
				title="Manage Addresses"
				subtitle={`${data.length} addresses`}
				action={openCreate}
				actionLabel="Add Address"
				actionIcon="plus-lg"
			/>

			<AddressTable
				data={data}
				isLoading={isLoading}
				refetch={refetch}
				openEdit={openEdit}
				setDeleteId={setDeleteId}
			/>

			<FormModal
				open={modalOpen}
				onClose={() => {
					setModalOpen(false);
					setEditItem(null);
					formik.resetForm();
					formik.setTouched({});
					formik.setErrors({});
				}}
				title={editItem ? "Edit Address" : "Add Address"}
				onSubmit={formik.handleSubmit}
				loading={create.isPending || update.isPending}
			>
				<AddressForm formik={formik} />
			</FormModal>

			<ConfirmDialog
				open={!!deleteId}
				onClose={() => setDeleteId(null)}
				onConfirm={async () => {
					try {
						await remove.mutateAsync(deleteId);

						setSuccessMessage("Address deleted successfully!");
					} catch (err) {
						setErrorMessage(
							err?.response?.data || "Failed to delete address.",
						);
					}

					setDeleteId(null);
				}}
				title="Delete Address"
				message="Are you sure you want to delete this address?"
				loading={remove.isPending}
			/>
		</div>
	);
}
