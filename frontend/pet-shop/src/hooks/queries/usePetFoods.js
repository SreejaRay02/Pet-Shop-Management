import { useQuery } from '@tanstack/react-query';
import { petFoodService } from '../../services/petFoodService';

export const PET_FOODS_KEY = ['petFoods'];

export const usePetFoods = (params) => {
  return useQuery({
        /* queryKey gives a unique identity to a query  */
        queryKey: [...PET_FOODS_KEY, params],

        /* queryFn is the actual function that fetches the data.  */
        queryFn: () => petFoodService.getAll(params).then((r) => r.data),
  });
};

export const usePetFoodById = (id) => {
  return useQuery({
    queryKey: [...PET_FOODS_KEY, id],
    queryFn: () => petFoodService.getById(id).then((r) => r.data),

    // Run the query only when a valid ID is available
    enabled: !!id,
  });
};
