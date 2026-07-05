import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../../services/categoryService';

export const CATEGORIES_KEY = ['categories'];

export const useCategories = () => {
  return useQuery({
    queryKey: CATEGORIES_KEY,
    queryFn: () => categoryService.getAll().then((r) => r.data),
  });
};

export const useCategoryById = (id) => {
  return useQuery({
    queryKey: [...CATEGORIES_KEY, id],
    queryFn: () => categoryService.getById(id).then((r) => r.data),
    enabled: !!id,
  });
};
