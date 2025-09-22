import type { MessageResponse } from "../redux/features/messages/types";
import { API_ROUTES } from "./apiRoutes";
import axiosInstance from "./axiosInstance";


export const fetchMessages = async () => {
  try {
    const { data } = await axiosInstance.get<MessageResponse>(API_ROUTES.MESSAGES.GET_ALL);

    return data;
  } catch (error: any) {
    console.log("error");
    throw new Error(error.response?.data?.message || "Failed to load messages");
  }
};