import { useMutation, useQueryClient } from '@tanstack/react-query';
import { petFoodService } from '../../services/petFoodService';
import { PET_FOODS_KEY } from '../queries/usePetFoods';
import { PETS_KEY } from '../queries/usePets';

// Hook to create a new pet food product (Post request)
export const useCreatePetFood = () => {
  const qc = useQueryClient();
  return useMutation({
    // mutationFn is the actual API call that changes the data
    mutationFn: (data) => petFoodService.create(data).then((r) => r.data),
       onSuccess: () => {
      // invalidateQueries deletes the old cached data.
      qc.invalidateQueries({ queryKey: PET_FOODS_KEY }); 
      console.log('Pet food created!'); 
    },
  });
};


// Hook to update an existing pet food product (Put request)
export const useUpdatePetFood = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => petFoodService.update(id, data).then((r) => r.data),
    onSuccess: () => { 
      qc.invalidateQueries({ queryKey: PET_FOODS_KEY }); 
      console.log('Pet food updated!'); 
    },
  });
};


// Hook to update only the quantity of pet food
export const useUpdateFoodQuantity = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, quantity }) => petFoodService.updateQuantity(id, quantity).then((r) => r.data),
    onSuccess: () => { 
      qc.invalidateQueries({ queryKey: PET_FOODS_KEY }); 
      qc.invalidateQueries({ queryKey: PETS_KEY }); 
      console.log('Quantity updated!'); 
    },
  });
};

// Hook to delete a pet food product
export const useDeletePetFood = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => petFoodService.remove(id),
    onSuccess: () => { 
      qc.invalidateQueries({ queryKey: PET_FOODS_KEY }); 
      console.log('Pet food deleted!'); 
    },
  });
};

