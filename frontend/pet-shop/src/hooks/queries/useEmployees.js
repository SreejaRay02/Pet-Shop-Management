import { useQuery } from '@tanstack/react-query';
import { employeeService } from '../../services/employeeService';

export const EMPLOYEES_KEY = ['employees'];

export const useEmployees = (params) => {
  return useQuery({
    queryKey: [...EMPLOYEES_KEY, params],
    queryFn: () => employeeService.getAll(params).then((r) => r.data),
  });
};
