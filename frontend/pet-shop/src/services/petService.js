import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

const getPets = async (params) => {
  return await axiosInstance.get(ENDPOINTS.PETS, { params });
};

const getPetById = async (id) => {
  return await axiosInstance.get(ENDPOINTS.PET(id));
};

const getPetsByCategory = async (categoryId) => {
  return await axiosInstance.get(ENDPOINTS.PETS_BY_CATEGORY(categoryId));
};

const getPetGroomingServices = async (petId) => {
  return await axiosInstance.get(ENDPOINTS.PET_GROOMING_SERVICES(petId));
};

const getPetVaccinations = async (petId) => {
  return await axiosInstance.get(ENDPOINTS.PET_VACCINATIONS(petId));
};

const getPetFoodInfo = async (petId) => {
  return await axiosInstance.get(ENDPOINTS.PET_FOOD_INFO(petId));
};

const getPetSuppliers = async (petId) => {
  return await axiosInstance.get(ENDPOINTS.PET_SUPPLIERS(petId));
};

const createPet = async (data) => {
  return await axiosInstance.post(ENDPOINTS.PETS, data);
};

const updatePet = async (id, data) => {
  return await axiosInstance.put(ENDPOINTS.PET(id), data);
};

const deletePet = async (id) => {
  return await axiosInstance.delete(ENDPOINTS.PET(id));
};

export const petService = {
  getAll: getPets,
  getById: getPetById,
  getByCategory: getPetsByCategory,
  getGroomingServices: getPetGroomingServices,
  getVaccinations: getPetVaccinations,
  getFoodInfo: getPetFoodInfo,
  getSuppliers: getPetSuppliers,
  create: createPet,
  update: updatePet,
  remove: deletePet,
};
