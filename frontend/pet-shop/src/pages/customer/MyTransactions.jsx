import React from "react";

import { useAuthStore } from "../../stores/authStore";
import { useCustomerByEmail } from "../../hooks/queries/useCustomers";
import { useCustomerTransactions } from "../../hooks/queries/useTransactions";
import { usePets } from "../../hooks/queries/usePets";
import DataTable from "../../components/tables/DataTable";
import { PageHeader, LoadingSpinner } from "../../components/layout/PageHeader";
import { formatCurrency, formatDate, statusColor } from "../../utils/helpers";
import TransactionTable from "../../components/tables/TransactionTable";

export default function MyTransactions() {
	const { user } = useAuthStore();
	const { data: customer } = useCustomerByEmail(user?.email);

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
