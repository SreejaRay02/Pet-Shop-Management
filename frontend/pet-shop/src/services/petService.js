

// Import our custom axios configuration
import axiosInstance from '../api/axiosInstance';

// Import our API URLs
import { ENDPOINTS } from '../api/endpoints';

// Fetch all pets from the API
const getPets = async (params) => {
  return await axiosInstance.get(ENDPOINTS.PETS, { params });
};

// Fetch a single pet by its ID
const getPetById = async (id) => {
  return await axiosInstance.get(ENDPOINTS.PET(id));
};

// Fetch pets that belong to a specific category
const getPetsByCategory = async (categoryId) => {
  return await axiosInstance.get(ENDPOINTS.PETS, { params: { category_id: categoryId } });
};

// Search for pets by name
const searchPets = async (query) => {
  return await axiosInstance.get(ENDPOINTS.PETS, { params: { name_like: query } });
};

// Get the grooming history for a specific pet
const getPetGroomingServices = async (petId) => {
  return await axiosInstance.get(ENDPOINTS.PET_GROOMING_REL, { params: { pet_id: petId } });
};

// Get the vaccination history for a specific pet
const getPetVaccinations = async (petId) => {
  return await axiosInstance.get(ENDPOINTS.PET_VACCINATION_REL, { params: { pet_id: petId } });
};

// Get the food preferences for a specific pet
const getPetFoodInfo = async (petId) => {
  return await axiosInstance.get(ENDPOINTS.PET_FOOD_REL, { params: { pet_id: petId } });
};

// Get the suppliers for a specific pet
const getPetSuppliers = async (petId) => {
  return await axiosInstance.get(ENDPOINTS.PET_SUPPLIER_REL, { params: { pet_id: petId } });
};

// Save a new pet to the database
const createPet = async (data) => {
  return await axiosInstance.post(ENDPOINTS.PETS, data);
};

// Update an existing pet
const updatePet = async (id, data) => {
  return await axiosInstance.put(ENDPOINTS.PET(id), data);
};

// Delete a pet from the database
const deletePet = async (id) => {
  return await axiosInstance.delete(ENDPOINTS.PET(id));
};

// We export this object to keep the old code working while we refactor.
export const petService = {
  getAll: getPets,
  getById: getPetById,
  getByCategory: getPetsByCategory,
  search: searchPets,
  getGroomingServices: getPetGroomingServices,
  getVaccinations: getPetVaccinations,
  getFoodInfo: getPetFoodInfo,
  getSuppliers: getPetSuppliers,
  create: createPet,
  update: updatePet,
  remove: deletePet,
};


