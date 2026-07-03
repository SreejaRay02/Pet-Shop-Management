import { useMutation, useQueryClient } from '@tanstack/react-query';

import { transactionService } from '../../services/transactionService';
import { TRANSACTIONS_KEY } from '../queries/useTransactions';

export const useCreateTransaction = () => {
  const qc = useQueryClient();
  return useMutation({
    // mutationFn is the actual API call that changes the data
    mutationFn: (data) => transactionService.create(data).then((r) => r.data),
        onSuccess: () => {
      // invalidateQueries deletes the old cached data.
      qc.invalidateQueries({ queryKey: TRANSACTIONS_KEY });
      console.log('Transaction created!');
    },
  });
};

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

