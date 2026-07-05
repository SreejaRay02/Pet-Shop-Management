import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

// Fetch pet foods with optional filters or pagination
const getPetFoods = async (params) => {
  return await axiosInstance.get(ENDPOINTS.PET_FOODS, { params });
};

// Get details of a single pet food by its ID
const getPetFoodById = async (id) => {
  return await axiosInstance.get(ENDPOINTS.PET_FOOD(id));
};

// Search pet foods by name
const searchPetFoods = async (name) => {
  return await axiosInstance.get(ENDPOINTS.PET_FOOD_SEARCH(name));
};

// Get pet foods of a specific type
const getPetFoodsByType = async (type) => {
  return await axiosInstance.get(ENDPOINTS.PET_FOOD_BY_TYPE(type));
};

// Get pet foods of a specific brand
const getPetFoodsByBrand = async (brand) => {
  return await axiosInstance.get(ENDPOINTS.PET_FOOD_BY_BRAND(brand));
};

// Add a new pet food
const createPetFood = async (data) => {
  return await axiosInstance.post(ENDPOINTS.PET_FOODS, data);
};

// Update all details of an existing pet food
const updatePetFood = async (id, data) => {
  return await axiosInstance.put(ENDPOINTS.PET_FOOD(id), data);
};

// Update only the available quantity
const updatePetFoodQuantity = async (id, quantity) => {
  return await axiosInstance.patch(ENDPOINTS.PET_FOOD(id), { quantity });
};

// Remove a pet food by its ID
const deletePetFood = async (id) => {
  return await axiosInstance.delete(ENDPOINTS.PET_FOOD(id));
};

// Export all pet food API methods together
export const petFoodService = {
  getAll: getPetFoods,
  getById: getPetFoodById,
  search: searchPetFoods,
  getByType: getPetFoodsByType,
  getByBrand: getPetFoodsByBrand,
  create: createPetFood,
  update: updatePetFood,
  updateQuantity: updatePetFoodQuantity,
  remove: deletePetFood,
};