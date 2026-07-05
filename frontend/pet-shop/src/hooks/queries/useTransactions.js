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


// Fetch all transactions for a specific customer
export const useCustomerTransactions = (customerId) => {
  return useQuery({
    queryKey: [...TRANSACTIONS_KEY, 'customer', customerId],
    queryFn: () => transactionService.getByCustomer(customerId).then((r) => r.data),

    // Run the query only when a valid ID is available
    enabled: !!customerId,
  });
};


// Fetch successful transaction-related data for a customer
export const useSuccessfulTransactions = (customerId) => {
  return useQuery({
    queryKey: [...TRANSACTIONS_KEY, 'customer', customerId, 'successful'],
    queryFn: () => axiosInstance.get(ENDPOINTS.CUSTOMER_PETS(customerId)).then(r => r.data),
    enabled: !!customerId,
  });
};
