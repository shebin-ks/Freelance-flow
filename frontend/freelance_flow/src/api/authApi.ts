import type { LoginPayload, LoginResponse, RegisterPayload, RegisterRespone } from "../redux/features/auth/types";
import { API_ROUTES } from "./apiRoutes";
import axiosInstance from "./axiosInstance";


export const loginUser = async (payload: LoginPayload) => {
  try {
    const response = await axiosInstance.post<LoginResponse>(API_ROUTES.AUTH.LOGIN, payload);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to Login";
    throw new Error(message);
  }
};

export const registerUser = async (payload: RegisterPayload) => {
  try {
    const response = await axiosInstance.post<RegisterRespone>(API_ROUTES.AUTH.REGISTER, payload);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to Register";
    throw new Error(message);
  }
};
