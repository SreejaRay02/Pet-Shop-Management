import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

const getGroomingServices = async (params) => {
  return await axiosInstance.get(ENDPOINTS.SERVICES, { params });
};

const getGroomingServiceById = async (id) => {
  return await axiosInstance.get(ENDPOINTS.SERVICE(id));
};

const getAvailableGroomingServices = async () => {
  return await axiosInstance.get(ENDPOINTS.SERVICES_AVAILABLE);
};

const getUnavailableGroomingServices = async () => {
  return await axiosInstance.get(ENDPOINTS.SERVICES_UNAVAILABLE);
};

export const createGroomingService = async (data) => {
  return await axiosInstance.post(ENDPOINTS.SERVICES, data);
};

export const updateGroomingService = async (id, data) => {
  return await axiosInstance.put(ENDPOINTS.SERVICE(id), data);
};

export const deleteGroomingService = async (id) => {
  return await axiosInstance.delete(ENDPOINTS.SERVICE(id));
};

export const groomingService = {
  getAll: getGroomingServices,
  getById: getGroomingServiceById,
  getAvailable: getAvailableGroomingServices,
  getUnavailable: getUnavailableGroomingServices,
  create: createGroomingService,
  update: updateGroomingService,
  remove: deleteGroomingService,
};
