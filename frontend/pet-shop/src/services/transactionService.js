
import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

// Fetch all transactions from the API
const getTransactions = async (params) => {
  return await axiosInstance.get(ENDPOINTS.TRANSACTIONS, { params });
};

// Fetch a single transaction by its ID
const getTransactionById = async (id) => {
  return await axiosInstance.get(ENDPOINTS.TRANSACTION(id));
};

// Fetch all transactions made by a specific customer
const getTransactionsByCustomer = async (customerId) => {
  return await axiosInstance.get(ENDPOINTS.TRANSACTIONS, { params: { customer_id: customerId } });
};

// Fetch all successful transactions
const getSuccessfulTransactions = async () => {
  return await axiosInstance.get(ENDPOINTS.TRANSACTIONS, { params: { transaction_status: 'Success' } });
};

// Fetch all failed transactions
const getFailedTransactions = async () => {
  return await axiosInstance.get(ENDPOINTS.TRANSACTIONS, { params: { transaction_status: 'Failed' } });
};

// Save a new transaction to the database
const createTransaction = async (data) => {
  return await axiosInstance.post(ENDPOINTS.TRANSACTIONS, data);
};

// Update an existing transaction
const updateTransaction = async (id, data) => {
  return await axiosInstance.put(ENDPOINTS.TRANSACTION(id), data);
};

// We export this object to keep the old code working while we refactor.
export const transactionService = {
  getAll: getTransactions,
  getById: getTransactionById,
  getByCustomer: getTransactionsByCustomer,
  getSuccessful: getSuccessfulTransactions,
  getFailed: getFailedTransactions,
  create: createTransaction,
  update: updateTransaction,
};

