import { useMutation, useQueryClient } from '@tanstack/react-query';

import { vaccinationService } from '../../services/vaccinationService';
import { VACCINATIONS_KEY } from '../queries/useVaccinations';

// Hook to create a new vaccination record (Post request)
export const useCreateVaccination = () => {
  const qc = useQueryClient();
  return useMutation({
    // mutationFn is the actual API call that changes the data
    mutationFn: (data) => vaccinationService.create(data).then((r) => r.data),
        onSuccess: () => {
      // invalidateQueries deletes the old cached data.
      qc.invalidateQueries({ queryKey: VACCINATIONS_KEY });
      console.log('Vaccination created!');
    },
  });
};


// Hook to update an existing vaccination record (Put request)
export const useUpdateVaccination = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => vaccinationService.update(id, data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: VACCINATIONS_KEY });
      console.log('Vaccination updated!');
    },
  });
};


// Hook to delete a vaccination record (Delete request)
export const useDeleteVaccination = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => vaccinationService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: VACCINATIONS_KEY });
      console.log('Vaccination deleted!');
    },
  });
};

