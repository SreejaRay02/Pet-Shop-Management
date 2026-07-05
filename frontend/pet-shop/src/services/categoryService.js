import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

const getCategories = async () => {
  return await axiosInstance.get(ENDPOINTS.CATEGORIES);
};

const getCategoryById = async (id) => {
  return await axiosInstance.get(ENDPOINTS.CATEGORY(id));
};

const searchCategories = async (name) => {
  return await axiosInstance.get(ENDPOINTS.CATEGORY_BY_NAME(name));
};

const createCategory = async (data) => {
  return await axiosInstance.post(ENDPOINTS.CATEGORIES, data);
};

const updateCategory = async (id, data) => {
  return await axiosInstance.put(ENDPOINTS.CATEGORY(id), data);
};

const deleteCategory = async (id) => {
  return await axiosInstance.delete(ENDPOINTS.CATEGORY(id));
};

export const categoryService = {
  getAll: getCategories,
  getById: getCategoryById,
  search: searchCategories,
  create: createCategory,
  update: updateCategory,
  remove: deleteCategory,
};
