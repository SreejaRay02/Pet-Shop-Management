import { useMutation, useQueryClient } from '@tanstack/react-query';

import { supplierService } from '../../services/supplierService';
import { SUPPLIERS_KEY } from '../queries/useSuppliers';

export const useCreateSupplier = () => {
  const qc = useQueryClient();
  return useMutation({
    // mutationFn is the actual API call that changes the data
    mutationFn: (data) => supplierService.create(data).then((r) => r.data),
    
    // onSuccess runs only if the API call succeeds
    onSuccess: () => {
      // invalidateQueries deletes the old cached data.
      // Why cache is refreshed: So the UI automatically re-fetches and shows the new data!
      qc.invalidateQueries({ queryKey: SUPPLIERS_KEY });
      console.log('Supplier created!');
    },
  });
};

export const useUpdateSupplier = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => supplierService.update(id, data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SUPPLIERS_KEY });
      console.log('Supplier updated!');
    },
  });
};

export const useDeleteSupplier = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => supplierService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SUPPLIERS_KEY });
      console.log('Supplier deleted!');
    },
  });
};