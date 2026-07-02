import { useMutation, useQueryClient } from '@tanstack/react-query';

import { petService } from '../../services/petService';
import { PETS_KEY } from '../queries/usePets';

// Hook to create a new pet
export const useCreatePet = () => {
  // useQueryClient gives us access to the React Query cache
  const qc = useQueryClient();
  
  return useMutation({
    // mutationFn is the actual API call that changes the data
    mutationFn: (data) => petService.create(data).then((r) => r.data),
    
    // onSuccess runs only if the API call succeeds
    onSuccess: () => {
      // invalidateQueries deletes the old cached data.
      // Why cache is refreshed: So the table automatically re-fetches and shows the new pet!
      qc.invalidateQueries({ queryKey: PETS_KEY });
      console.log('Pet created successfully!');
    },
    
    // onError runs if the API call fails
    onError: () => console.error('Failed to create pet'),
  });
};

// Hook to update an existing pet
export const useUpdatePet = () => {
  const qc = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => petService.update(id, data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PETS_KEY });
      console.log('Pet updated successfully!');
    },
    onError: () => console.error('Failed to update pet'),
  });
};

// Hook to delete a pet
export const useDeletePet = () => {
  const qc = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => petService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PETS_KEY });
      console.log('Pet deleted successfully!');
    },
    onError: () => console.error('Failed to delete pet'),
  });
};

