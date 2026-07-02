// Import our custom axios configuration (Yet to be configured)
import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

const getAddresses = async () => {
	return await axiosInstance.get(ENDPOINTS.ADDRESSES);
};

const getAddressById = async (id) => {
	return await axiosInstance.get(ENDPOINTS.ADDRESS(id));
};

const createAddress = async (data) => {
	return await axiosInstance.post(ENDPOINTS.ADDRESSES, data);
};

const updateAddress = async (id, data) => {
	return await axiosInstance.put(ENDPOINTS.ADDRESS(id), data);
};

const deleteAddress = async (id) => {
	return await axiosInstance.delete(ENDPOINTS.ADDRESS(id));
};

export const addressService = {
	getAll: getAddresses,
	getById: getAddressById,
	create: createAddress,
	update: updateAddress,
	remove: deleteAddress,
};