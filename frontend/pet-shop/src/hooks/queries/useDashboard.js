
import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../services/dashboardService';

export const DASHBOARD_KEY = ['dashboard'];

// Fetch the main dashboard metrics
export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: [...DASHBOARD_KEY, 'metrics'],
    queryFn: () => dashboardService.getMetrics(),
  });
};


// Fetch revenue data grouped by month
export const useRevenueByMonth = () => {
  return useQuery({
    queryKey: [...DASHBOARD_KEY, 'revenue'],
    queryFn: () => dashboardService.getRevenueByMonth(),
  });
};

