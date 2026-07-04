import React, { useState, useEffect, useCallback } from "react";
import { useFormik } from "formik";

import FormModal from "../../components/dialogs/FormModal";
import ConfirmDialog from "../../components/dialogs/ConfirmDialog";
import { PageHeader } from "../../components/layout/PageHeader";
import { useCustomers } from "../../hooks/queries/useCustomers";
import { useAddresses } from "../../hooks/queries/useAddresses";
import {
	useCreateCustomer,
	useUpdateCustomer,
	useDeleteCustomer,
} from "../../hooks/mutations/useCustomerMutations";
import { customerSchema } from "../../validations/schemas";
import CustomerTable from "../../components/tables/CustomerTable";
import CustomerForm from "../../components/forms/CustomerForm";

export default function ManageCustomers() {
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

	const { data = [], isLoading, refetch } = useCustomers();
	const { data: addresses = [] } = useAddresses();

	const create = useCreateCustomer();
	const update = useUpdateCustomer();
	const remove = useDeleteCustomer();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			first_name: editItem?.first_name || "",
			last_name: editItem?.last_name || "",
			email: editItem?.email || "",
			phone_number: editItem?.phone_number || "",
			address_id: editItem?.address_id || "",
		},
		validationSchema: customerSchema,
		onSubmit: async (values) => {
			try {
				if (editItem) {
					await update.mutateAsync({
						id: editItem.id,
						data: values,
					});
					setSuccessMessage("Customer updated successfully!");
				} else {
					await create.mutateAsync(values);
					setSuccessMessage("Customer created successfully!");
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

	const { resetForm, setTouched, setErrors, handleSubmit } = formik;

	const openCreate = useCallback(() => {
		setEditItem(null);
		resetForm();
		setTouched({});
		setErrors({});
		setModalOpen(true);
	}, [resetForm, setTouched, setErrors]);

	const openEdit = useCallback(
		(item) => {
			setEditItem(item);
			setTouched({});
			setErrors({});
			setModalOpen(true);
		},
		[setTouched, setErrors],
	);

	return (
		<div className="container p-0">
			{successMessage && (
				<div className="alert alert-success m-3">{successMessage}</div>
			)}

			{errorMessage && (
				<div className="alert alert-danger m-3">{errorMessage}</div>
			)}

			<PageHeader
				title="Manage Customers"
				subtitle={`${data.length} customers`}
				action={openCreate}
				actionLabel="Add Customer"
				actionIcon="plus-lg"
			/>

			<CustomerTable
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
				title={editItem ? "Edit Customer" : "Add Customer"}
				onSubmit={handleSubmit}
				loading={create.isPending || update.isPending}
			>
				<CustomerForm
					formik={formik}
					addresses={addresses}
					emailEditable={!editItem}
				/>
			</FormModal>

			<ConfirmDialog
				open={!!deleteId}
				onClose={() => setDeleteId(null)}
				onConfirm={async () => {
					try {
						await remove.mutateAsync(deleteId);

						setSuccessMessage("Customer deleted successfully!");
					} catch (err) {
						setErrorMessage(
							err?.response?.data || "Failed to delete customer.",
						);
					}

					setDeleteId(null);
				}}
				title="Delete Customer"
				message="Are you sure you want to delete this customer?"
				loading={remove.isPending}
			/>
		</div>
	);
}
