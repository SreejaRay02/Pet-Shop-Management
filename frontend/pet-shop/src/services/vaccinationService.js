import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

const getVaccinations = async (params) => {
  return await axiosInstance.get(ENDPOINTS.VACCINATIONS, { params });
};

const getVaccinationById = async (id) => {
  return await axiosInstance.get(ENDPOINTS.VACCINATION(id));
};

const getAvailableVaccinations = async () => {
  return await axiosInstance.get(ENDPOINTS.VACCINATIONS_AVAILABLE);
};

const getUnavailableVaccinations = async () => {
  return await axiosInstance.get(ENDPOINTS.VACCINATIONS_UNAVAILABLE);
};

const createVaccination = async (data) => {
  return await axiosInstance.post(ENDPOINTS.VACCINATIONS, data);
};

const updateVaccination = async (id, data) => {
  return await axiosInstance.put(ENDPOINTS.VACCINATION(id), data);
};

const deleteVaccination = async (id) => {
  return await axiosInstance.delete(ENDPOINTS.VACCINATION(id));
};

export const vaccinationService = {
  getAll: getVaccinations,
  getById: getVaccinationById,
  getAvailable: getAvailableVaccinations,
  getUnavailable: getUnavailableVaccinations,
  create: createVaccination,
  update: updateVaccination,
  remove: deleteVaccination,
};
