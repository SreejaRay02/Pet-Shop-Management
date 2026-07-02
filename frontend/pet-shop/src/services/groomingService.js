import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

// Fetch all grooming services from the API
const getGroomingServices = async (params) => {
  return await axiosInstance.get(ENDPOINTS.GROOMING, { params });
};

// Fetch a single grooming service by its ID
const getGroomingServiceById = async (id) => {
  return await axiosInstance.get(ENDPOINTS.GROOMING_SERVICE(id));
};

// Fetch only the grooming services that are currently available
const getAvailableGroomingServices = async () => {
  return await axiosInstance.get(ENDPOINTS.GROOMING, { params: { available: true } });
};

// Fetch only the grooming services that are currently unavailable
const getUnavailableGroomingServices = async () => {
  return await axiosInstance.get(ENDPOINTS.GROOMING, { params: { available: false } });
};

// Save a new grooming service to the database
export const createGroomingService = async (data) => {
  return await axiosInstance.post(ENDPOINTS.GROOMING, data);
};

// Update an existing grooming service
export const updateGroomingService = async (id, data) => {
  return await axiosInstance.put(ENDPOINTS.GROOMING_SERVICE(id), data);
};

// Delete a grooming service from the database
export const deleteGroomingService = async (id) => {
  return await axiosInstance.delete(ENDPOINTS.GROOMING_SERVICE(id));
};

// We export this object to keep the old code working while we refactor.
export const groomingService = {
  getAll: getGroomingServices,
  getById: getGroomingServiceById,
  getAvailable: getAvailableGroomingServices,
  getUnavailable: getUnavailableGroomingServices,
  create: createGroomingService,
  update: updateGroomingService,
  remove: deleteGroomingService,
};

