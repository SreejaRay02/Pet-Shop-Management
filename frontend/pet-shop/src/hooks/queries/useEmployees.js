import { useQuery } from '@tanstack/react-query';
import { employeeService } from '../../services/employeeService';

export const EMPLOYEES_KEY = ['employees'];

export const useEmployees = (params) => {
  return useQuery({
    queryKey: [...EMPLOYEES_KEY, params],
    queryFn: () => employeeService.getAll(params).then((r) => r.data),
  });
};

export const useEmployeeById = (id) => {
  return useQuery({
    queryKey: [...EMPLOYEES_KEY, id],
    queryFn: () => employeeService.getById(id).then((r) => r.data),
    enabled: !!id,
  });
};

export const useEmployeeByEmail = (email) => {
  return useQuery({
    queryKey: [...EMPLOYEES_KEY, 'email', email],
    queryFn: () => employeeService.getByEmail(email).then((r) => r.data[0]),
    enabled: !!email,
  });
};
