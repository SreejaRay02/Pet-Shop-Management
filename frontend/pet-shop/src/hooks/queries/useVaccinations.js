import { useQuery } from '@tanstack/react-query';
import { vaccinationService } from '../../services/vaccinationService';

export const VACCINATIONS_KEY = ['vaccinations'];

export const useVaccinations = (params) => {
  return useQuery({
        queryKey: [...VACCINATIONS_KEY, params],
        queryFn: () => vaccinationService.getAll(params).then((r) => r.data),
  });
};

export const useVaccinationById = (id) => {
  return useQuery({
    queryKey: [...VACCINATIONS_KEY, id],
    queryFn: () => vaccinationService.getById(id).then((r) => r.data),
    enabled: !!id,
  });
};
