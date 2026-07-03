import React from "react";

import { useAuthStore } from "../../stores/authStore";
import { useCustomers } from "../../hooks/queries/useCustomers";
import { useCustomerTransactions } from "../../hooks/queries/useTransactions";
import { usePets } from "../../hooks/queries/usePets";
import PetCard from "../../components/cards/PetCard";
import { PageHeader, LoadingSpinner } from "../../components/layout/PageHeader";

export default function MyPets() {
	const { user } = useAuthStore(); // Get current logged in user's data
	const { data: customers = [] } = useCustomers(); // Get list of all customers
	const customer = customers.find((c) => c.email === user?.email); // Find the customer

	// Get their transactions and the pets list
	const { data: transactions = [], isLoading } = useCustomerTransactions(
		customer?.id,
	);
	const { data: pets = [] } = usePets();

	// Find all successful transactions and get just the pet_id from them
	const purchasedPetIds = transactions
		.filter((t) => t.transaction_status === "Success")
		.map((t) => t.pet_id);

	// Get all pets belonging to customer
	const myPets = pets.filter((p) => purchasedPetIds.includes(p.id));

	return (
		<div className="container p-0" fluid>
			<PageHeader
				title="My Pets"
				subtitle={`${myPets.length} pet${myPets.length !== 1 ? "s" : ""} adopted`}
			/>

			{isLoading ? (
				<LoadingSpinner />
			) : myPets.length === 0 ? (
				// If they have no pets, show a friendly empty state
				<div className="text-center py-5 mt-5">
					<div style={{ fontSize: "80px", marginBottom: "1rem" }}>
						🐾
					</div>
					<h6 className="text-secondary mb-2">
						You haven't adopted any pets yet
					</h6>
					<p className="text-secondary small mt-2">
						Browse our catalog to find your perfect companion!
					</p>
				</div>
			) : (
				// Draw a grid of PetCards for every pet they own
				<div className="row g-4">
					{myPets.map((pet) => (
						<div className="col-12 col-sm-6 col-md-4" key={pet.id}>
							<PetCard pet={pet} />
						</div>
					))}
				</div>
			)}
		</div>
	);
}
