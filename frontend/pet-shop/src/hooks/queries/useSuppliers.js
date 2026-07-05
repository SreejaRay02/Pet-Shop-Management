import { useQuery } from '@tanstack/react-query';
import { supplierService } from '../../services/supplierService';

export const SUPPLIERS_KEY = ['suppliers'];

export const useSuppliers = (params) => {
  return useQuery({
    queryKey: [...SUPPLIERS_KEY, params],
    queryFn: () => supplierService.getAll(params).then((r) => r.data),
  });
};

export const useSupplierById = (id) => {
  return useQuery({
    queryKey: [...SUPPLIERS_KEY, id],
    queryFn: () => supplierService.getById(id).then((r) => r.data),
    enabled: !!id,
  });
};

export const useSupplierByEmail = (email) => {
  return useQuery({
    queryKey: [...SUPPLIERS_KEY, 'email', email],
    queryFn: () => supplierService.getByEmail(email).then((r) => r.data[0]),
    enabled: !!email,
  });
};