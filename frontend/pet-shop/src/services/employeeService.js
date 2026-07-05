import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

const getEmployees = async (params) => {
  return await axiosInstance.get(ENDPOINTS.EMPLOYEES, { params });
};

const getEmployeeById = async (id) => {
  return await axiosInstance.get(ENDPOINTS.EMPLOYEE(id));
};

const getEmployeeByEmail = async (email) => {
  return await axiosInstance.get(ENDPOINTS.EMPLOYEE_BY_EMAIL(email));
};

const searchEmployees = async (query) => {
  return await axiosInstance.get(ENDPOINTS.EMPLOYEE_BY_NAME(query));
};

const getEmployeesByPosition = async (position) => {
  return await axiosInstance.get(ENDPOINTS.EMPLOYEE_BY_POSITION(position));
};

const createEmployee = async (data) => {
  return await axiosInstance.post(ENDPOINTS.EMPLOYEES, data);
};

const updateEmployee = async (id, data) => {
  return await axiosInstance.put(ENDPOINTS.EMPLOYEE(id), data);
};

const deleteEmployee = async (id) => {
  return await axiosInstance.delete(ENDPOINTS.EMPLOYEE(id));
};

export const employeeService = {
  getAll: getEmployees,
  getById: getEmployeeById,
  getByEmail: getEmployeeByEmail,
  search: searchEmployees,
  getByPosition: getEmployeesByPosition,
  create: createEmployee,
  update: updateEmployee,
  remove: deleteEmployee,
};
