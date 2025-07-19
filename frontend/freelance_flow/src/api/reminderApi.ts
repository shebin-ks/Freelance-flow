import type { CreateReminderResponse, ReminderPayload, ReminderResponse } from "../redux/features/reminders/types";
import { API_ROUTES } from "./apiRoutes";
import axiosInstance from "./axiosInstance";

export const createReminder = async (payload: ReminderPayload) => {
  try {
    const { data } = await axiosInstance.post<CreateReminderResponse>(API_ROUTES.REMINDERS.CREATE, payload);
    return data;
  } catch (error: any) {
    console.log(error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Failed to create reminder");
  }
};

export const fetchUpcomingReminders = async (days: number = 7) => {
  try {
    const { data } = await axiosInstance.get<ReminderResponse>(`${API_ROUTES.REMINDERS.GET_UPCOMING}?days=${days}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch upcoming reminders");
  }
};

export const fetchReminders = async () => {
  try {
    const { data } = await axiosInstance.get<ReminderResponse>(API_ROUTES.REMINDERS.GET_ALL);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch reminders");
  }
};


export const markReminderAsDone = async (reminderId: number) => {
  try {
    const response = await axiosInstance.patch<CreateReminderResponse>(API_ROUTES.REMINDERS.MARK_COMPLETE(reminderId));
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update status");
  }
};