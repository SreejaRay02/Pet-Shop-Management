
import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

// Fetch all vaccinations from the API
const getVaccinations = async (params) => {
  return await axiosInstance.get(ENDPOINTS.VACCINATIONS, { params });
};

// Fetch a single vaccination record by its ID
const getVaccinationById = async (id) => {
  return await axiosInstance.get(ENDPOINTS.VACCINATION(id));
};

// Fetch vaccinations that are currently available in stock
const getAvailableVaccinations = async () => {
  return await axiosInstance.get(ENDPOINTS.VACCINATIONS, { params: { available: true } });
};

// Fetch vaccinations that are currently out of stock/unavailable
const getUnavailableVaccinations = async () => {
  return await axiosInstance.get(ENDPOINTS.VACCINATIONS, { params: { available: false } });
};

// Save a new vaccination type to the database
const createVaccination = async (data) => {
  return await axiosInstance.post(ENDPOINTS.VACCINATIONS, data);
};

// Update an existing vaccination record
const updateVaccination = async (id, data) => {
  return await axiosInstance.put(ENDPOINTS.VACCINATION(id), data);
};

// Delete a vaccination record from the database
const deleteVaccination = async (id) => {
  return await axiosInstance.delete(ENDPOINTS.VACCINATION(id));
};

// We export this object to keep the old code working while we refactor.
export const vaccinationService = {
  getAll: getVaccinations,
  getById: getVaccinationById,
  getAvailable: getAvailableVaccinations,
  getUnavailable: getUnavailableVaccinations,
  create: createVaccination,
  update: updateVaccination,
  remove: deleteVaccination,
};

