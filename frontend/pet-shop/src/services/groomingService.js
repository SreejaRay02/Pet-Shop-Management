import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

// Get all grooming services (supports filters, pagination, etc.)
const getGroomingServices = async (params) => {
  return await axiosInstance.get(ENDPOINTS.SERVICES, { params });
};

// Get details of a grooming service by its ID 
const getGroomingServiceById = async (id) => {
  return await axiosInstance.get(ENDPOINTS.SERVICE(id));
};

// Get only the services that are currently available
const getAvailableGroomingServices = async () => {
  return await axiosInstance.get(ENDPOINTS.SERVICES_AVAILABLE);
};

// Get only the services that are currently unavailable
const getUnavailableGroomingServices = async () => {
  return await axiosInstance.get(ENDPOINTS.SERVICES_UNAVAILABLE);
};

// Add a new grooming service
export const createGroomingService = async (data) => {
  return await axiosInstance.post(ENDPOINTS.SERVICES, data);
};

// Update an existing grooming service
export const updateGroomingService = async (id, data) => {
  return await axiosInstance.put(ENDPOINTS.SERVICE(id), data);
};

// Delete a grooming service by its ID
export const deleteGroomingService = async (id) => {
  return await axiosInstance.delete(ENDPOINTS.SERVICE(id));
};

// Export all grooming service API methods together
export const groomingService = {
  getAll: getGroomingServices,
  getById: getGroomingServiceById,
  getAvailable: getAvailableGroomingServices,
  getUnavailable: getUnavailableGroomingServices,
  create: createGroomingService,
  update: updateGroomingService,
  remove: deleteGroomingService,
};