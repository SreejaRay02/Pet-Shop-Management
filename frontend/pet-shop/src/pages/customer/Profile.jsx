import React, { useState } from "react";
import { useFormik } from "formik";

import { useAuthStore } from "../../stores/authStore";
import { useCustomers } from "../../hooks/queries/useCustomers";
import { useAddresses } from "../../hooks/queries/useAddresses";
import {
	useCreateCustomer,
	useUpdateCustomer,
} from "../../hooks/mutations/useCustomerMutations";
import { useCustomerTransactions } from "../../hooks/queries/useTransactions";
import { PageHeader } from "../../components/layout/PageHeader";
import CustomerForm from "../../components/forms/CustomerForm";
import { formatCurrency, getInitials } from "../../utils/helpers";
import { customerSchema } from "../../validations/schemas";

export default function CustomerProfile() {
	const { user } = useAuthStore(); // Get current logged in user's data
	const { data: customers = [] } = useCustomers(); // Get list of all customers
	const customer = customers.find((c) => c.email === user?.email); // Find the customer
	const { data: addresses = [] } = useAddresses(); // Needed for the address dropdown
	const { data: transactions = [] } = useCustomerTransactions(customer?.id);

	const createCustomer = useCreateCustomer();
	const updateCustomer = useUpdateCustomer();

	const [editing, setEditing] = useState(false);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			first_name: customer?.first_name || "",
			last_name: customer?.last_name || "",
			email: customer?.email || user?.email || "",
			phone_number: customer?.phone_number || "",
			address_id: customer?.address_id || "",
		},
		validationSchema: customerSchema,
		onSubmit: async (values) => {
			const payload = {
				...values,
				address_id: values.address_id
					? Number(values.address_id)
					: null,
			};
			if (customer) {
				await updateCustomer.mutateAsync({
					id: customer.id,
					data: {
						...customer,
						...payload,
					},
				});
			} else {
				await createCustomer.mutateAsync({
					...payload,
					email: user.email,
				});
			}
			setEditing(false);
		},
	});

	// Total amount of money customer has spent on successful purchases
	const totalSpent = transactions
		.filter((t) => t.transaction_status === "Success")
		.reduce((sum, t) => sum + Number(t.amount), 0);

	const customerAddress = addresses.find(
		(a) => a.id === customer?.address_id,
	);

	return (
		<div className="container p-0">
			<PageHeader
				title="My Profile"
				subtitle="Manage your account details"
			/>

			<div className="row g-4">
				<div className="col-12 col-md-4">
					<div className="card p-4 text-center border-0 shadow-sm">
						<div
							className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
							style={{
								width: "80px",
								height: "80px",
								fontSize: "32px",
							}}
						>
							{customer
								? getInitials(
										customer.first_name,
										customer.last_name,
									)
								: user?.username?.[0]?.toUpperCase()}
						</div>

						<h6 className="fw-bold mb-1">
							{customer
								? `${customer.first_name} ${customer.last_name}`
								: user?.username}
						</h6>

						<p className="text-secondary small mb-2">
							{user?.email}
						</p>

						<span className="badge bg-primary fw-normal">
							Customer
						</span>

						<hr className="my-4 text-muted" />

						<div className="row g-3">
							<div className="col-6">
								<h5 className="fw-bold mb-0">
									{transactions.length}
								</h5>

								<span className="text-secondary small">
									Transactions
								</span>
							</div>

							<div className="col-6">
								<h5 className="fw-bold mb-0">
									{formatCurrency(totalSpent)}
								</h5>

								<span className="text-secondary small">
									Total Spent
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className="col-12 col-md-8">
					<div className="card p-4 border-0 shadow-sm">
						<form onSubmit={formik.handleSubmit}>
							<div className="d-flex justify-content-between align-items-center mb-4">
								<h5 className="fw-bold mb-0">
									Account Details
								</h5>

								{!editing ? (
									<button
										type="button"
										className="btn btn-outline-primary btn-sm"
										onClick={() => {
											formik.resetForm();
											setEditing(true);
										}}
									>
										{customer
											? "Edit Profile"
											: "Complete Profile"}
									</button>
								) : (
									<div className="d-flex gap-2">
										<button
											type="button"
											className="btn btn-secondary btn-sm"
											onClick={() => {
												formik.resetForm();
												setEditing(false);
											}}
										>
											Cancel
										</button>

										<button
											type="submit"
											className="btn btn-primary btn-sm"
											disabled={
												formik.isSubmitting ||
												updateCustomer.isPending ||
												createCustomer.isPending ||
												!formik.isValid
											}
										>
											Save
										</button>
									</div>
								)}
							</div>

							{!customer && !editing && (
								<div
									className="alert alert-info mb-4"
									role="alert"
								>
									Complete your profile to get personalized
									recommendations.
								</div>
							)}

							{editing ? (
								<CustomerForm
									formik={formik}
									addresses={addresses}
									emailEditable={false}
								/>
							) : (
								<div className="row g-3">
									<div className="col-12 col-sm-6">
										<span className="text-secondary small d-block mb-1">
											First Name
										</span>
										<span className="fw-semibold">
											{customer?.first_name || "-"}
										</span>
									</div>

									<div className="col-12 col-sm-6">
										<span className="text-secondary small d-block mb-1">
											Last Name
										</span>
										<span className="fw-semibold">
											{customer?.last_name || "-"}
										</span>
									</div>

									<div className="col-12 col-sm-6">
										<span className="text-secondary small d-block mb-1">
											Phone Number
										</span>
										<span className="fw-semibold">
											{customer?.phone_number || "-"}
										</span>
									</div>

									<div className="col-12 col-sm-6">
										<span className="text-secondary small d-block mb-1">
											Email
										</span>
										<span className="fw-semibold">
											{user?.email}
										</span>
									</div>

									<div className="col-12">
										<span className="text-secondary small d-block mb-1">
											Address
										</span>

										<span className="fw-semibold">
											{customerAddress
												? `${customerAddress.street}, ${customerAddress.city}`
												: "-"}
										</span>
									</div>
								</div>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
