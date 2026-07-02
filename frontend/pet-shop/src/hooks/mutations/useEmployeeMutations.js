import { useMutation, useQueryClient } from '@tanstack/react-query';

import { employeeService } from '../../services/employeeService';
import { EMPLOYEES_KEY } from '../queries/useEmployees';

export const useCreateEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    // mutationFn is the actual API call that changes the data
    mutationFn: (data) => employeeService.create(data).then((r) => r.data),
    
    // onSuccess runs only if the API call succeeds
    onSuccess: () => {
      // invalidateQueries deletes the old cached data.
      // Why cache is refreshed: So the UI automatically re-fetches and shows the new data!
      qc.invalidateQueries({ queryKey: EMPLOYEES_KEY });
      console.log('Employee created!');
    },
  });
};

export const useUpdateEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => employeeService.update(id, data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: EMPLOYEES_KEY });
      console.log('Employee updated!');
    },
  });
};

export const useDeleteEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => employeeService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: EMPLOYEES_KEY });
      console.log('Employee deleted!');
    },
  });
};