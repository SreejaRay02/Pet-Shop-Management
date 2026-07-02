import { useQuery } from '@tanstack/react-query';
// We import the old service object to maintain compatibility
import { petService } from '../../services/petService';

// We define a unique key for the React Query cache
export const PETS_KEY = ['pets'];

// Fetch all pets from server
export const usePets = (params) => {
  return useQuery({
    
    queryKey: [...PETS_KEY, params],
    
    queryFn: () => petService.getAll(params).then((r) => r.data),
  });
};

// Fetch a single pet by ID
export const usePet = (id) => {
  return useQuery({
    queryKey: [...PETS_KEY, id],
    queryFn: () => petService.getById(id).then((r) => r.data),
    // enabled: false means this query will NOT run if the ID is missing
    enabled: !!id, 
  });
};



// Fetch grooming services for a specific pet
export const usePetGroomingServices = (petId) => {
  return useQuery({
    queryKey: [...PETS_KEY, 'grooming', petId],
    queryFn: () => petService.getGroomingServices(petId).then((r) => r.data),
    enabled: !!petId,
  });
};

// Fetch vaccinations for a specific pet
export const usePetVaccinations = (petId) => {
  return useQuery({
    queryKey: [...PETS_KEY, 'vaccinations', petId],
    queryFn: () => petService.getVaccinations(petId).then((r) => r.data),
    enabled: !!petId,
  });
};

// Fetch food preferences for a specific pet
export const usePetFoodInfo = (petId) => {
  return useQuery({
    queryKey: [...PETS_KEY, 'food', petId],
    queryFn: () => petService.getFoodInfo(petId).then((r) => r.data),
    enabled: !!petId,
  });
};



