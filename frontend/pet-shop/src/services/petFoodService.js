import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

const getPetFoods = async (params) => {
  return await axiosInstance.get(ENDPOINTS.PET_FOODS, { params });
};

const getPetFoodById = async (id) => {
  return await axiosInstance.get(ENDPOINTS.PET_FOOD(id));
};

const searchPetFoods = async (name) => {
  return await axiosInstance.get(ENDPOINTS.PET_FOOD_SEARCH(name));
};

const getPetFoodsByType = async (type) => {
  return await axiosInstance.get(ENDPOINTS.PET_FOOD_BY_TYPE(type));
};

const getPetFoodsByBrand = async (brand) => {
  return await axiosInstance.get(ENDPOINTS.PET_FOOD_BY_BRAND(brand));
};

const createPetFood = async (data) => {
  return await axiosInstance.post(ENDPOINTS.PET_FOODS, data);
};

const updatePetFood = async (id, data) => {
  return await axiosInstance.put(ENDPOINTS.PET_FOOD(id), data);
};

const updatePetFoodQuantity = async (id, quantity) => {
  return await axiosInstance.patch(ENDPOINTS.PET_FOOD(id), { quantity });
};

const deletePetFood = async (id) => {
  return await axiosInstance.delete(ENDPOINTS.PET_FOOD(id));
};

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
