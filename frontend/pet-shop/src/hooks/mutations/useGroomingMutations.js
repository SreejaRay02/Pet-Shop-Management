
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { groomingService } from '../../services/groomingService';
import { GROOMING_KEY } from '../queries/useGroomingServices';

// Hook to create a new grooming service (Post request)
export const useCreateGroomingService = () => {
  const qc = useQueryClient();
  return useMutation({
    // mutationFn is the actual API call that changes the data
    mutationFn: (data) => groomingService.create(data).then((r) => r.data),
        onSuccess: () => {
      // invalidateQueries deletes the old cached data.
      qc.invalidateQueries({ queryKey: GROOMING_KEY });
      console.log('Grooming service created!');
    },
  });
};


// Hook to update an existing grooming service (Put request)
export const useUpdateGroomingService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => groomingService.update(id, data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: GROOMING_KEY });
      console.log('Grooming service updated!');
    },
  });
};

// Hook to delete a grooming service (Delete request)
export const useDeleteGroomingService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => groomingService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: GROOMING_KEY });
      console.log('Grooming service deleted!');
    },
  });
};

