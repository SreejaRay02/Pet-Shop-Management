import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

// Fetch all employees from the API
const getEmployees = async (params) => {
  return await axiosInstance.get(ENDPOINTS.EMPLOYEES, { params });
};

// Fetch a single employee by their ID
const getEmployeeById = async (id) => {
  return await axiosInstance.get(ENDPOINTS.EMPLOYEE(id));
};

// Search for employees by their first name
const searchEmployees = async (query) => {
  return await axiosInstance.get(ENDPOINTS.EMPLOYEES, { params: { first_name_like: query } });
};

// Fetch employees by their job position (e.g., 'Manager', 'Cashier')
const getEmployeesByPosition = async (position) => {
  return await axiosInstance.get(ENDPOINTS.EMPLOYEES, { params: { position } });
};

// Save a new employee to the database
const createEmployee = async (data) => {
  return await axiosInstance.post(ENDPOINTS.EMPLOYEES, data);
};

// Update an existing employee
const updateEmployee = async (id, data) => {
  return await axiosInstance.put(ENDPOINTS.EMPLOYEE(id), data);
};

// Delete an employee from the database
const deleteEmployee = async (id) => {
  return await axiosInstance.delete(ENDPOINTS.EMPLOYEE(id));
};

// We export this object to keep the old code working while we refactor.
export const employeeService = {
  getAll: getEmployees,
  getById: getEmployeeById,
  search: searchEmployees,
  getByPosition: getEmployeesByPosition,
  create: createEmployee,
  update: updateEmployee,
  remove: deleteEmployee,
};
