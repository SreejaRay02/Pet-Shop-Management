import { useMutation, useQueryClient } from '@tanstack/react-query';

import { categoryService } from '../../services/categoryService';
import { CATEGORIES_KEY } from '../queries/useCategories';

export const useCreateCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    // mutationFn is the actual API call that changes the data
    mutationFn: (data) => categoryService.create(data).then((r) => r.data),
    
    // onSuccess runs only if the API call succeeds
    onSuccess: () => {
      // invalidateQueries deletes the old cached data.
      qc.invalidateQueries({ queryKey: CATEGORIES_KEY });
      console.log('Category created!');
    },
  });
};

export const useUpdateCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => categoryService.update(id, data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CATEGORIES_KEY });
      console.log('Category updated!');
    },
  });
};

export const useDeleteCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => categoryService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CATEGORIES_KEY });
      console.log('Category deleted!');
    },
  });
};

