import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

// Fetch all data needed to build the dashboard
const getDashboardMetrics = async () => {
  // Load all required resources together for better performance
  const [pets, customers, suppliers, employees, transactions, successTx, failedTx] = await Promise.all([
    axiosInstance.get(ENDPOINTS.PETS),
    axiosInstance.get(ENDPOINTS.CUSTOMERS),
    axiosInstance.get(ENDPOINTS.SUPPLIERS),
    axiosInstance.get(ENDPOINTS.EMPLOYEES),
    axiosInstance.get(ENDPOINTS.TRANSACTIONS),
    axiosInstance.get(ENDPOINTS.TRANSACTIONS_SUCCESSFUL),
    axiosInstance.get(ENDPOINTS.TRANSACTIONS_FAILED),
  ]);

  // Calculate total revenue from successful transactions
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

    // Keep only the latest 5 transactions
    recentTransactions: transactions.data.slice(-5).reverse(),
  };
};

// Prepare monthly revenue data for charts
const getRevenueByMonth = async () => {
  const res = await axiosInstance.get(ENDPOINTS.TRANSACTIONS_SUCCESSFUL);
  const txList = res.data;

  const byMonth = {};

  txList.forEach((t) => {
    // Extract the "YYYY-MM" part from the transaction date
    const month = t.transaction_date?.slice(0, 7) || 'Unknown';

    // Add the transaction amount to its corresponding month
    byMonth[month] = (byMonth[month] || 0) + Number(t.amount);
  });

  return Object.entries(byMonth)
    // Sort months in chronological order
    .sort(([a], [b]) => a.localeCompare(b))
    // Convert into a format suitable for charts
    .map(([month, revenue]) => ({ month, revenue }));
};

// Export all dashboard-related API methods together
export const dashboardService = {
  getMetrics: getDashboardMetrics,
  getRevenueByMonth: getRevenueByMonth,
};