
import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

// Fetch all the summary numbers for the dashboard
const getDashboardMetrics = async () => {
  // Promise.all runs all these requests at the exact same time to make it faster
  const [pets, customers, suppliers, employees, transactions] = await Promise.all([
    axiosInstance.get(ENDPOINTS.PETS),
    axiosInstance.get(ENDPOINTS.CUSTOMERS),
    axiosInstance.get(ENDPOINTS.SUPPLIERS),
    axiosInstance.get(ENDPOINTS.EMPLOYEES),
    axiosInstance.get(ENDPOINTS.TRANSACTIONS),
  ]);

  const txList = transactions.data;
  
  // Find only the successful transactions
  const successTx = txList.filter((t) => t.transaction_status === 'Success');
  
  // Calculate total money made (summing up the 'amount' field)
  const totalRevenue = successTx.reduce((sum, t) => sum + Number(t.amount), 0);

  // Return a clean object with all the calculated numbers
  return {
    totalPets: pets.data.length,
    totalCustomers: customers.data.length,
    totalSuppliers: suppliers.data.length,
    totalEmployees: employees.data.length,
    totalTransactions: txList.length,
    totalRevenue,
    successfulTransactions: successTx.length,
    // Find failed transactions
    failedTransactions: txList.filter((t) => t.transaction_status === 'Failed').length,
    // Get the last 5 transactions for the "Recent Transactions" table
    recentTransactions: txList.slice(-5).reverse(),
  };
};

// Calculate how much money was made each month for the chart
const getRevenueByMonth = async () => {
  const res = await axiosInstance.get(ENDPOINTS.TRANSACTIONS);
  const txList = res.data.filter((t) => t.transaction_status === 'Success');
  
  const byMonth = {};
  
  // Group the transactions by their month (e.g. "2023-10")
  txList.forEach((t) => {
    const month = t.transaction_date?.slice(0, 7) || 'Unknown';
    // Add the amount to that month's total
    byMonth[month] = (byMonth[month] || 0) + Number(t.amount);
  });
  
  // Convert the object into an array and sort it by date
  return Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, revenue]) => ({ month, revenue }));
};

// We export this object to keep the old code working while we refactor.
export const dashboardService = {
  getMetrics: getDashboardMetrics,
  getRevenueByMonth: getRevenueByMonth,
};
