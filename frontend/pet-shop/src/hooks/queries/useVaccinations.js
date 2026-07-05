import { useQuery } from '@tanstack/react-query';
import { vaccinationService } from '../../services/vaccinationService';

export const VACCINATIONS_KEY = ['vaccinations'];

export const useVaccinations = (params) => {
  return useQuery({
        /* queryKey gives a unique identity to a query  */
        queryKey: [...VACCINATIONS_KEY, params],

        /* queryFn is the actual function that fetches the data.  */
        queryFn: () => vaccinationService.getAll(params).then((r) => r.data),
  });
};

export const useVaccinationById = (id) => {
  return useQuery({
    queryKey: [...VACCINATIONS_KEY, id],
    queryFn: () => vaccinationService.getById(id).then((r) => r.data),

    // Run the query only when a valid ID is available
    enabled: !!id,
  });
};
