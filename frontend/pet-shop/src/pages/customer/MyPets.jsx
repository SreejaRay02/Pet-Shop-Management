import React from "react";

import { useAuthStore } from "../../stores/authStore";
import {
	useCustomerByEmail,
	useCustomerPurchasedPets,
} from "../../hooks/queries/useCustomers";
import PetCard from "../../components/cards/PetCard";
import { PageHeader, LoadingSpinner } from "../../components/layout/PageHeader";

export default function MyPets() {
	const { user } = useAuthStore();
	const { data: customer } = useCustomerByEmail(user?.email);
	const { data: myPets = [], isLoading } = useCustomerPurchasedPets(
		customer?.id,
	);

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
