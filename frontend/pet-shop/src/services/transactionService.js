import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

const getTransactions = async (params) => {
  return await axiosInstance.get(ENDPOINTS.TRANSACTIONS, { params });
};

const getTransactionById = async (id) => {
  return await axiosInstance.get(ENDPOINTS.TRANSACTION(id));
};

const getTransactionsByCustomer = async (customerId) => {
  return await axiosInstance.get(ENDPOINTS.TRANSACTIONS_BY_CUSTOMER(customerId));
};

const getSuccessfulTransactions = async () => {
  return await axiosInstance.get(ENDPOINTS.TRANSACTIONS_SUCCESSFUL);
};

const getFailedTransactions = async () => {
  return await axiosInstance.get(ENDPOINTS.TRANSACTIONS_FAILED);
};

const createTransaction = async (data) => {
  return await axiosInstance.post(ENDPOINTS.TRANSACTIONS, data);
};

const updateTransaction = async (id, data) => {
  return await axiosInstance.put(ENDPOINTS.TRANSACTION(id), data);
};

export const transactionService = {
  getAll: getTransactions,
  getById: getTransactionById,
  getByCustomer: getTransactionsByCustomer,
  getSuccessful: getSuccessfulTransactions,
  getFailed: getFailedTransactions,
  create: createTransaction,
  update: updateTransaction,
};
