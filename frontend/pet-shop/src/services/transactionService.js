import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

// Get all transactions (supports filters, pagination, etc.)
const getTransactions = async (params) => {
  return await axiosInstance.get(ENDPOINTS.TRANSACTIONS, { params });
};

// Get details of a transaction by its ID
const getTransactionById = async (id) => {
  return await axiosInstance.get(ENDPOINTS.TRANSACTION(id));
};

// Get all transactions for a specific customer
const getTransactionsByCustomer = async (customerId) => {
  return await axiosInstance.get(ENDPOINTS.TRANSACTIONS_BY_CUSTOMER(customerId));
};

// Get only successful transactions
const getSuccessfulTransactions = async () => {
  return await axiosInstance.get(ENDPOINTS.TRANSACTIONS_SUCCESSFUL);
};

// Get only failed transactions
const getFailedTransactions = async () => {
  return await axiosInstance.get(ENDPOINTS.TRANSACTIONS_FAILED);
};

// Create a new transaction
const createTransaction = async (data) => {
  return await axiosInstance.post(ENDPOINTS.TRANSACTIONS, data);
};

// Update an existing transaction
const updateTransaction = async (id, data) => {
  return await axiosInstance.put(ENDPOINTS.TRANSACTION(id), data);
};

// Export all transaction API methods together
export const transactionService = {
  getAll: getTransactions,
  getById: getTransactionById,
  getByCustomer: getTransactionsByCustomer,
  getSuccessful: getSuccessfulTransactions,
  getFailed: getFailedTransactions,
  create: createTransaction,
  update: updateTransaction,
};