import { useQuery } from '@tanstack/react-query';
import { employeeService } from '../../services/employeeService';

export const EMPLOYEES_KEY = ['employees'];

export const useEmployees = (params) => {
  return useQuery({
    /*
    queryKey is like a unique ID for this specific data in the cache.
    Why is it needed? So React Query knows exactly which data to store, retrieve, or delete.
    */
    queryKey: [...EMPLOYEES_KEY, params],
    
    /*
    queryFn is the actual function that fetches the data.
    Why does React Query cache data? To make the app feel instantly fast. 
    It shows the saved data first while silently updating in the background.
    */
    queryFn: () => employeeService.getAll(params).then((r) => r.data),
  });
};
