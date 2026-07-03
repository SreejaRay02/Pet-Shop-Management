import React from "react";

import { useAuthStore } from "../../stores/authStore";
import { useCustomers } from "../../hooks/queries/useCustomers";
import { useCustomerTransactions } from "../../hooks/queries/useTransactions";
import { usePets } from "../../hooks/queries/usePets";
import DataTable from "../../components/tables/DataTable";
import { PageHeader, LoadingSpinner } from "../../components/layout/PageHeader";
import { formatCurrency, formatDate, statusColor } from "../../utils/helpers";
import TransactionTable from "../../components/tables/TransactionTable";

export default function MyTransactions() {
	const { user } = useAuthStore(); // Get current logged in user's data
	const { data: customers = [] } = useCustomers(); // Get list of all customers
	const customer = customers.find((c) => c.email === user?.email); // Find the customer

	// Get their transactions and the pets list
	const { data: transactions = [], isLoading } = useCustomerTransactions(
		customer?.id,
	);
	const { data: pets = [] } = usePets();

	const getBadgeBg = (status) => {
		const color = statusColor(status);
		if (color === "error") return "danger";
		if (color === "default") return "secondary";
		return color;
	};

	return (
		<div className="container p-0" fluid>
			<PageHeader
				title="My Transactions"
				subtitle={`${transactions.length} total transactions`}
			/>

			{isLoading ? (
				<LoadingSpinner />
			) : (
				<TransactionTable
					data={transactions}
					isLoading={isLoading}
					pets={pets}
					adminView={false}
				/>
			)}
		</div>
	);
}
