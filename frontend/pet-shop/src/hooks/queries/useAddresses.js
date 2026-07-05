import { useQuery } from '@tanstack/react-query';
import { addressService } from '../../services/addressService';

// Base cache key for all address queries, exported to maintain consistency
export const ADDRESSES_KEY = ['addresses'];

export const useAddresses = () => {
	return useQuery({
		queryKey: ADDRESSES_KEY,
		queryFn: () => addressService.getAll().then((r) => r.data),
	});
};

export const useAddressById = (id) => {
	return useQuery({
		queryKey: [...ADDRESSES_KEY, id],
		queryFn: () => addressService.getById(id).then((r) => r.data),
		enabled: !!id,
	});
};