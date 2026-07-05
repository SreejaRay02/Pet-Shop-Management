import { useQuery } from '@tanstack/react-query';
import { customerService } from '../../services/customerService';
import axiosInstance from '../../api/axiosInstance';
import { ENDPOINTS } from '../../api/endpoints';
import { petService } from '../../services/petService';

// Base cache key for all customer queries, exported to maintain consistency
export const CUSTOMERS_KEY = ['customers'];

export const useCustomers = (params) => {
	return useQuery({
		queryKey: [...CUSTOMERS_KEY, params],
		queryFn: () => customerService.getAll(params).then((r) => r.data),
	});
};

export const useCustomerById = (id) => {
	return useQuery({
		queryKey: [...CUSTOMERS_KEY, id],
		queryFn: () => customerService.getById(id).then((r) => r.data),
		enabled: !!id,
	});
};

export const useCustomerByEmail = (email) => {
	return useQuery({
		queryKey: [...CUSTOMERS_KEY, 'email', email],
		queryFn: () => customerService.getByEmail(email).then((r) => r.data[0]),
		enabled: !!email,
	});
};

export const useCustomerPurchasedPets = (customerId) => {
	return useQuery({
		queryKey: [...CUSTOMERS_KEY, 'purchasedPets', customerId],
		queryFn: async () => {
			const res = await axiosInstance.get(ENDPOINTS.CUSTOMER_PETS(customerId));
			const transactions = res.data;

			const petPromises = transactions.map(t => petService.getById(t.pet_id).then(r => r.data));
			return await Promise.all(petPromises);
		},
		enabled: !!customerId,
	});
};