import { useQuery } from '@tanstack/react-query';
import { transactionService } from '../../services/transactionService';

export const TRANSACTIONS_KEY = ['transactions'];

export const useTransactions = (params) => {
  return useQuery({
        queryKey: [...TRANSACTIONS_KEY, params],
        queryFn: () => transactionService.getAll(params).then((r) => r.data),
  });
};


// Fetch all transactions made by a specific customer
export const useCustomerTransactions = (customerId) => {
  return useQuery({
    queryKey: [...TRANSACTIONS_KEY, 'customer', customerId],
    queryFn: () => transactionService.getByCustomer(customerId).then((r) => r.data),
    enabled: !!customerId,
  });
};
