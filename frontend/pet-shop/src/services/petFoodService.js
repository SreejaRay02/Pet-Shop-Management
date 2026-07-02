
import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

// Fetch all pet foods from the API
const getPetFoods = async (params) => {
  return await axiosInstance.get(ENDPOINTS.PET_FOODS, { params });
};

// Fetch a single pet food product by its ID
const getPetFoodById = async (id) => {
  return await axiosInstance.get(ENDPOINTS.PET_FOOD(id));
};

// Search for pet food by name
const searchPetFoods = async (name) => {
  return await axiosInstance.get(ENDPOINTS.PET_FOODS, { params: { name_like: name } });
};

// Fetch pet food by its type (e.g., 'Dry', 'Wet')
const getPetFoodsByType = async (type) => {
  return await axiosInstance.get(ENDPOINTS.PET_FOODS, { params: { type } });
};

// Fetch pet food by brand name
const getPetFoodsByBrand = async (brand) => {
  return await axiosInstance.get(ENDPOINTS.PET_FOODS, { params: { brand } });
};

// Save a new pet food product to the database
const createPetFood = async (data) => {
  return await axiosInstance.post(ENDPOINTS.PET_FOODS, data);
};

// Update an existing pet food product
const updatePetFood = async (id, data) => {
  return await axiosInstance.put(ENDPOINTS.PET_FOOD(id), data);
};

// Update only the quantity of a pet food product (e.g., after a sale)
const updatePetFoodQuantity = async (id, quantity) => {
  // Using patch 
  return await axiosInstance.patch(ENDPOINTS.PET_FOOD(id), { quantity });
};

// Delete a pet food product from the database
const deletePetFood = async (id) => {
  return await axiosInstance.delete(ENDPOINTS.PET_FOOD(id));
};

// We export this object to keep the old code working while we refactor.
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

