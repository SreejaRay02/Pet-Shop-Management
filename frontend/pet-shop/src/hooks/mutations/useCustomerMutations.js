import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customerService } from '../../services/customerService';
import { CUSTOMERS_KEY } from '../queries/useCustomers'; // The base cache key for customers

export const useCreateCustomer = () => {
	const qc = useQueryClient();
	return useMutation({
		// mutationFn is the actual API call that changes the data
		mutationFn: (data) => customerService.create(data).then((r) => r.data),

		// onSuccess runs only if the API call succeeds
		onSuccess: () => {
			// invalidateQueries deletes old cached data and automatically refetches and shows new data
			qc.invalidateQueries({ queryKey: CUSTOMERS_KEY });
			console.log('Customer created');
		},
	});
};

export const useUpdateCustomer = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => customerService.update(id, data).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: CUSTOMERS_KEY });
			console.log('Customer updated');
		},
	});
};

export const useDeleteCustomer = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => customerService.remove(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: CUSTOMERS_KEY });
			console.log('Customer deleted');
		},
	});
};