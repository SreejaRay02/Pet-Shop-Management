import { useQuery } from '@tanstack/react-query';
import { transactionService } from '../../services/transactionService';
import axiosInstance from '../../api/axiosInstance';
import { ENDPOINTS } from '../../api/endpoints';

export const TRANSACTIONS_KEY = ['transactions'];

export const useTransactions = (params) => {
  return useQuery({
        queryKey: [...TRANSACTIONS_KEY, params],
        queryFn: () => transactionService.getAll(params).then((r) => r.data),
  });
};

export const useCustomerTransactions = (customerId) => {
  return useQuery({
    queryKey: [...TRANSACTIONS_KEY, 'customer', customerId],
    queryFn: () => transactionService.getByCustomer(customerId).then((r) => r.data),
    enabled: !!customerId,
  });
};

export const useSuccessfulTransactions = (customerId) => {
  return useQuery({
    queryKey: [...TRANSACTIONS_KEY, 'customer', customerId, 'successful'],
    queryFn: () => axiosInstance.get(ENDPOINTS.CUSTOMER_PETS(customerId)).then(r => r.data),
    enabled: !!customerId,
  });
};
