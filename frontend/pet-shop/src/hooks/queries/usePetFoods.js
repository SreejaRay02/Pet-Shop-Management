
import { useQuery } from '@tanstack/react-query';
import { petFoodService } from '../../services/petFoodService';

export const PET_FOODS_KEY = ['petFoods'];

export const usePetFoods = (params) => {
  return useQuery({
        queryKey: [...PET_FOODS_KEY, params],
        queryFn: () => petFoodService.getAll(params).then((r) => r.data),
  });
};


