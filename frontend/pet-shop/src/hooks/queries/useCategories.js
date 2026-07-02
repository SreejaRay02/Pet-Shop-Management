import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../../services/categoryService';

export const CATEGORIES_KEY = ['categories'];

// Fetch all pet categories
export const useCategories = () => {
  return useQuery({
    
    queryKey: CATEGORIES_KEY,
    
    
    queryFn: () => categoryService.getAll().then((r) => r.data),
  });
};

