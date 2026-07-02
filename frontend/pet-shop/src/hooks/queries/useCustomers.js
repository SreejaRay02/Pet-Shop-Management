import { useQuery } from '@tanstack/react-query';
import { customerService } from '../../services/customerService';

// Base cache key for all customer queries, exported to maintain consistency
export const CUSTOMERS_KEY = ['customers'];

export const useCustomers = (params) => {
	return useQuery({
		queryKey: [...CUSTOMERS_KEY, params],
		queryFn: () => customerService.getAll(params).then((r) => r.data),
	});
};