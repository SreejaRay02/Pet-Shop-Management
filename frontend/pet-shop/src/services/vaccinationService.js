import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

// Get all vaccinations (supports filters, pagination, etc.)
const getVaccinations = async (params) => {
  return await axiosInstance.get(ENDPOINTS.VACCINATIONS, { params });
};

// Get details of a vaccination by its ID
const getVaccinationById = async (id) => {
  return await axiosInstance.get(ENDPOINTS.VACCINATION(id));
};

// Get only the vaccinations that are currently available
const getAvailableVaccinations = async () => {
  return await axiosInstance.get(ENDPOINTS.VACCINATIONS_AVAILABLE);
};

// Get only the vaccinations that are currently unavailable
const getUnavailableVaccinations = async () => {
  return await axiosInstance.get(ENDPOINTS.VACCINATIONS_UNAVAILABLE);
};

// Add a new vaccination
const createVaccination = async (data) => {
  return await axiosInstance.post(ENDPOINTS.VACCINATIONS, data);
};

// Update an existing vaccination
const updateVaccination = async (id, data) => {
  return await axiosInstance.put(ENDPOINTS.VACCINATION(id), data);
};

// Delete a vaccination by its ID
const deleteVaccination = async (id) => {
  return await axiosInstance.delete(ENDPOINTS.VACCINATION(id));
};

// Export all vaccination API methods together
export const vaccinationService = {
  getAll: getVaccinations,
  getById: getVaccinationById,
  getAvailable: getAvailableVaccinations,
  getUnavailable: getUnavailableVaccinations,
  create: createVaccination,
  update: updateVaccination,
  remove: deleteVaccination,
};