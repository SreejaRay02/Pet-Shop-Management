import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

const getSuppliers = async (params) => {
  return await axiosInstance.get(ENDPOINTS.SUPPLIERS, { params });
};

const getSupplierById = async (id) => {
  return await axiosInstance.get(ENDPOINTS.SUPPLIER(id));
};

const getSupplierByEmail = async (email) => {
  return await axiosInstance.get(ENDPOINTS.SUPPLIER_BY_EMAIL(email));
};

const searchSuppliers = async (query) => {
  return await axiosInstance.get(ENDPOINTS.SUPPLIER_BY_NAME(query));
};

const getSuppliersByCity = async (city) => {
  return await axiosInstance.get(ENDPOINTS.SUPPLIER_BY_CITY(city));
};

const getSuppliersByState = async (state) => {
  return await axiosInstance.get(ENDPOINTS.SUPPLIER_BY_STATE(state));
};

const createSupplier = async (data) => {
  return await axiosInstance.post(ENDPOINTS.SUPPLIERS, data);
};

const updateSupplier = async (id, data) => {
  return await axiosInstance.put(ENDPOINTS.SUPPLIER(id), data);
};

const deleteSupplier = async (id) => {
  return await axiosInstance.delete(ENDPOINTS.SUPPLIER(id));
};

export const supplierService = {
  getAll: getSuppliers,
  getById: getSupplierById,
  getByEmail: getSupplierByEmail,
  search: searchSuppliers,
  getByCity: getSuppliersByCity,
  getByState: getSuppliersByState,
  create: createSupplier,
  update: updateSupplier,
  remove: deleteSupplier,
};