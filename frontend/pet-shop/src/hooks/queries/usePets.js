import { useQuery } from '@tanstack/react-query';
import { petService } from '../../services/petService';
import { groomingService } from '../../services/groomingService';
import { vaccinationService } from '../../services/vaccinationService';
import { petFoodService } from '../../services/petFoodService';

export const PETS_KEY = ['pets'];

export const usePets = (params) => {
  return useQuery({
    queryKey: [...PETS_KEY, params],
    queryFn: () => petService.getAll(params).then((r) => r.data),
  });
};

export const usePet = (id) => {
  return useQuery({
    queryKey: [...PETS_KEY, id],
    queryFn: () => petService.getById(id).then((r) => r.data),
    enabled: !!id, 
  });
};

export const usePetGroomingServices = (petId) => {
  return useQuery({
    queryKey: [...PETS_KEY, 'grooming', petId],
    queryFn: async () => {
      const rels = await petService.getGroomingServices(petId).then(r => r.data);
      const promises = rels.map(r => groomingService.getById(r.service_id).then(res => res.data));
      return await Promise.all(promises);
    },
    enabled: !!petId,
  });
};

export const usePetVaccinations = (petId) => {
  return useQuery({
    queryKey: [...PETS_KEY, 'vaccinations', petId],
    queryFn: async () => {
      const rels = await petService.getVaccinations(petId).then(r => r.data);
      const promises = rels.map(r => vaccinationService.getById(r.vaccination_id).then(res => res.data));
      return await Promise.all(promises);
    },
    enabled: !!petId,
  });
};

export const usePetFoodInfo = (petId) => {
  return useQuery({
    queryKey: [...PETS_KEY, 'food', petId],
    queryFn: async () => {
      const rels = await petService.getFoodInfo(petId).then(r => r.data);
      const promises = rels.map(r => petFoodService.getById(r.food_id).then(res => res.data));
      return await Promise.all(promises);
    },
    enabled: !!petId,
  });
};
