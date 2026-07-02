import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

const getCustomers = async (params) => {
	return await axiosInstance.get(ENDPOINTS.CUSTOMERS, { params });
};

const getCustomerById = async (id) => {
	return await axiosInstance.get(ENDPOINTS.CUSTOMER(id));
};

const searchCustomers = async (query) => {
	return await axiosInstance.get(ENDPOINTS.CUSTOMERS, { params: { first_name_like: query } });
};

const getCustomersByCity = async (city) => {
	return await axiosInstance.get(ENDPOINTS.CUSTOMERS, { params: { city } });
};

const getCustomersByState = async (state) => {
	return await axiosInstance.get(ENDPOINTS.CUSTOMERS, { params: { state } });
};

const createCustomer = async (data) => {
	return await axiosInstance.post(ENDPOINTS.CUSTOMERS, data);
};

const updateCustomer = async (id, data) => {
	return await axiosInstance.put(ENDPOINTS.CUSTOMER(id), data);
};

const deleteCustomer = async (id) => {
	return await axiosInstance.delete(ENDPOINTS.CUSTOMER(id));
};

export const customerService = {
	getAll: getCustomers,
	getById: getCustomerById,
	search: searchCustomers,
	getByCity: getCustomersByCity,
	getByState: getCustomersByState,
	create: createCustomer,
	update: updateCustomer,
	remove: deleteCustomer,
};