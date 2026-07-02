// Import our custom axios configuration
import axiosInstance from '../api/axiosInstance';

// Import our API URLs
import { ENDPOINTS } from '../api/endpoints';

// Fetch all pet categories from the API
const getCategories = async () => {
  return await axiosInstance.get(ENDPOINTS.CATEGORIES);
};

// Fetch a single category by its ID
const getCategoryById = async (id) => {
  return await axiosInstance.get(ENDPOINTS.CATEGORY(id));
};

// Search for a category by its name
const searchCategories = async (name) => {
  return await axiosInstance.get(ENDPOINTS.CATEGORIES, { params: { name_like: name } });
};

// Save a new category to the database
const createCategory = async (data) => {
  return await axiosInstance.post(ENDPOINTS.CATEGORIES, data);
};

// Update an existing category
const updateCategory = async (id, data) => {
  return await axiosInstance.put(ENDPOINTS.CATEGORY(id), data);
};

// Delete a category from the database
const deleteCategory = async (id) => {
  return await axiosInstance.delete(ENDPOINTS.CATEGORY(id));
};

// We export this object to keep the old code working while we refactor.
export const categoryService = {
  getAll: getCategories,
  getById: getCategoryById,
  search: searchCategories,
  create: createCategory,
  update: updateCategory,
  remove: deleteCategory,
};
