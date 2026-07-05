import React, { useState } from "react";
import { useFormik } from "formik";

import { useAuthStore } from "../../stores/authStore";
import { useCustomerByEmail } from "../../hooks/queries/useCustomers";
import { useAddresses, useAddressById } from "../../hooks/queries/useAddresses";
import {
	useCreateCustomer,
	useUpdateCustomer,
} from "../../hooks/mutations/useCustomerMutations";
import {
	useCustomerTransactions,
	useSuccessfulTransactions,
} from "../../hooks/queries/useTransactions";
import { PageHeader } from "../../components/layout/PageHeader";
import CustomerForm from "../../components/forms/CustomerForm";
import { formatCurrency, getInitials } from "../../utils/helpers";
import { customerSchema } from "../../validations/schemas";

export default function CustomerProfile() {
	const { user } = useAuthStore();
	const { data: customer } = useCustomerByEmail(user?.email);
	const { data: addresses = [] } = useAddresses(); // Needed for the edit form dropdown
	const { data: customerAddress } = useAddressById(customer?.address_id);

	const { data: transactions = [] } = useCustomerTransactions(customer?.id);
	const { data: successfulTransactions = [] } = useSuccessfulTransactions(
		customer?.id,
	);

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
	const totalSpent = successfulTransactions.reduce(
		(sum, t) => sum + Number(t.amount),
		0,
	);

	const displayName = customer
		? `${customer.first_name} ${customer.last_name}`
		: user?.username;
	const avatarInitials = customer
		? getInitials(customer.first_name, customer.last_name)
		: user?.username?.[0]?.toUpperCase();

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
							{avatarInitials}
						</div>

						<h6 className="fw-bold mb-1">{displayName}</h6>

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
									customer && (
										<button
											type="button"
											className="btn btn-outline-primary btn-sm"
											onClick={() => {
												formik.resetForm();
												setEditing(true);
											}}
										>
											Edit Profile
										</button>
									)
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
									className="alert alert-success d-flex flex-column align-items-center text-center p-4 mb-4 rounded-4 shadow-sm border-0"
									style={{ backgroundColor: "#d1e7dd" }}
								>
									<h1 className="display-3 mb-2">🎉 🐾</h1>
									<h3 className="fw-bold text-success mb-2">
										Welcome to the PetShop Family!
									</h3>
									<p className="fs-6 text-dark mb-4 px-1">
										We are absolutely thrilled to have you
										here! You are just one small step away
										from finding your new best friend.
										Complete your profile below to unlock
										adoptions, grooming services, and a
										whole lot of tail-wagging joy!
									</p>
									<button
										type="button"
										className="btn btn-success px-3 rounded-pill fw-bold shadow-sm"
										onClick={() => {
											formik.resetForm();
											setEditing(true);
										}}
									>
										Let's Get Started! 🐶
									</button>
								</div>
							)}

							{editing ? (
								<CustomerForm
									formik={formik}
									addresses={addresses}
									emailEditable={false}
								/>
							) : (
								customer && (
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
								)
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
