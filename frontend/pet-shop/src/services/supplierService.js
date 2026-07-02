import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

// Fetch all suppliers from the API
const getSuppliers = async (params) => {
  return await axiosInstance.get(ENDPOINTS.SUPPLIERS, { params });
};

// Fetch a single supplier by their ID
const getSupplierById = async (id) => {
  return await axiosInstance.get(ENDPOINTS.SUPPLIER(id));
};

// Search for a supplier by their business name
const searchSuppliers = async (query) => {
  return await axiosInstance.get(ENDPOINTS.SUPPLIERS, { params: { name_like: query } });
};

// Fetch all suppliers located in a specific city
const getSuppliersByCity = async (city) => {
  return await axiosInstance.get(ENDPOINTS.SUPPLIERS, { params: { city } });
};

// Fetch all suppliers located in a specific state
const getSuppliersByState = async (state) => {
  return await axiosInstance.get(ENDPOINTS.SUPPLIERS, { params: { state } });
};

// Save a new supplier to the database
const createSupplier = async (data) => {
  return await axiosInstance.post(ENDPOINTS.SUPPLIERS, data);
};

// Update an existing supplier's details
const updateSupplier = async (id, data) => {
  return await axiosInstance.put(ENDPOINTS.SUPPLIER(id), data);
};

// Delete a supplier from the database
const deleteSupplier = async (id) => {
  return await axiosInstance.delete(ENDPOINTS.SUPPLIER(id));
};

// We export this object to keep the old code working while we refactor.
export const supplierService = {
  getAll: getSuppliers,
  getById: getSupplierById,
  search: searchSuppliers,
  getByCity: getSuppliersByCity,
  getByState: getSuppliersByState,
  create: createSupplier,
  update: updateSupplier,
  remove: deleteSupplier,
};