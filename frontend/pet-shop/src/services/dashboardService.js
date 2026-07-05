import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

const getDashboardMetrics = async () => {
  const [pets, customers, suppliers, employees, transactions, successTx, failedTx] = await Promise.all([
    axiosInstance.get(ENDPOINTS.PETS),
    axiosInstance.get(ENDPOINTS.CUSTOMERS),
    axiosInstance.get(ENDPOINTS.SUPPLIERS),
    axiosInstance.get(ENDPOINTS.EMPLOYEES),
    axiosInstance.get(ENDPOINTS.TRANSACTIONS),
    axiosInstance.get(ENDPOINTS.TRANSACTIONS_SUCCESSFUL),
    axiosInstance.get(ENDPOINTS.TRANSACTIONS_FAILED),
  ]);

  const totalRevenue = successTx.data.reduce((sum, t) => sum + Number(t.amount), 0);

  return {
    totalPets: pets.data.length,
    totalCustomers: customers.data.length,
    totalSuppliers: suppliers.data.length,
    totalEmployees: employees.data.length,
    totalTransactions: transactions.data.length,
    totalRevenue,
    successfulTransactions: successTx.data.length,
    failedTransactions: failedTx.data.length,
    recentTransactions: transactions.data.slice(-5).reverse(),
  };
};

const getRevenueByMonth = async () => {
  const res = await axiosInstance.get(ENDPOINTS.TRANSACTIONS_SUCCESSFUL);
  const txList = res.data;
  
  const byMonth = {};
  
  txList.forEach((t) => {
    const month = t.transaction_date?.slice(0, 7) || 'Unknown';
    byMonth[month] = (byMonth[month] || 0) + Number(t.amount);
  });
  
  return Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, revenue]) => ({ month, revenue }));
};

export const dashboardService = {
  getMetrics: getDashboardMetrics,
  getRevenueByMonth: getRevenueByMonth,
};
