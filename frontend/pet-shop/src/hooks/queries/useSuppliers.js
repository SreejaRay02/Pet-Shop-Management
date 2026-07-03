import { useQuery } from '@tanstack/react-query';
import { supplierService } from '../../services/supplierService';

export const SUPPLIERS_KEY = ['suppliers'];

export const useSuppliers = (params) => {
  return useQuery({
    queryKey: [...SUPPLIERS_KEY, params],
    queryFn: () => supplierService.getAll(params).then((r) => r.data),
  });
};