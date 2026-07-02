
import { useQuery } from '@tanstack/react-query';
import { groomingService } from '../../services/groomingService';

export const GROOMING_KEY = ['grooming'];

export const useGroomingServices = (params) => {
  return useQuery({
    /* queryKey is like a unique ID  */
    queryKey: [...GROOMING_KEY, params],
    
    /* queryFn is the actual function that fetches the data.  */
    queryFn: () => groomingService.getAll(params).then((r) => r.data),
  });
};

