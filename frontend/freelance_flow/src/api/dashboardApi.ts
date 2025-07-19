import type { DashboardSummaryResponse } from "../redux/features/dashboard/types";
import { API_ROUTES } from "./apiRoutes";
import axiosInstance from "./axiosInstance";

export const fetchDashboardSummary = async () => {
  try {
    const response = await axiosInstance.get<DashboardSummaryResponse>(API_ROUTES.DASHBOARD.SUMMARY);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch dashboard summary');
  }
};
