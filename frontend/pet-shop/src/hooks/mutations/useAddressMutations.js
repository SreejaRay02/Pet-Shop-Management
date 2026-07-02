import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addressService } from '../../services/addressService';
import { ADDRESSES_KEY } from '../queries/useAddresses';

export const useCreateAddress = () => {
	const qc = useQueryClient();
	return useMutation({
		// mutationFn is the actual API call that changes the data
		mutationFn: (data) => addressService.create(data).then((r) => r.data),

		// onSuccess runs only if the API call succeeds
		onSuccess: () => {
			// invalidateQueries deletes old cached data and automatically refetches and shows new data
			qc.invalidateQueries({ queryKey: ADDRESSES_KEY });
			console.log('Address created!');
		},
	});
};

export const useUpdateAddress = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => addressService.update(id, data).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ADDRESSES_KEY });
			console.log('Address updated!');
		},
	});
};

export const useDeleteAddress = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id) => addressService.remove(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ADDRESSES_KEY });
			console.log('Address deleted!');
		},
	});
};