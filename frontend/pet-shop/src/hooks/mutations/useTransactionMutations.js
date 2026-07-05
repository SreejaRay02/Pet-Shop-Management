import { useMutation, useQueryClient } from '@tanstack/react-query';

import { transactionService } from '../../services/transactionService';
import { TRANSACTIONS_KEY } from '../queries/useTransactions';
import { CUSTOMERS_KEY } from '../queries/useCustomers';

// Hook to create a new transaction (Post request)
export const useCreateTransaction = () => {
  const qc = useQueryClient();
  return useMutation({
    // mutationFn is the actual API call that changes the data
    mutationFn: (data) => transactionService.create(data).then((r) => r.data),
        onSuccess: () => {
      // invalidateQueries deletes the old cached data.
      qc.invalidateQueries({ queryKey: TRANSACTIONS_KEY });
      qc.invalidateQueries({ queryKey: CUSTOMERS_KEY });
      console.log('Transaction created!');
    },
  });
};


// Hook to update an existing transaction (Put request)
export const useUpdateTransaction = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => transactionService.update(id, data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: TRANSACTIONS_KEY });
      console.log('Transaction updated!');
    },
  });
};

