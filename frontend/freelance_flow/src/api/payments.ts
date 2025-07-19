import type { AddPaymentResponse, PaymentPayload, PaymentResponse } from "../redux/features/revenue/types";
import { API_ROUTES } from "./apiRoutes";
import axiosInstance from "./axiosInstance";

export const fetchPayments = async () => {
  try {
    const { data } = await axiosInstance.get<PaymentResponse>(API_ROUTES.PAYMENTS.GET_ALL);
    return data;
  } catch (error: any) {
    console.log(error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Failed to fetch payments");
  }
};

export const createPayment = async (payload: PaymentPayload) => {
  try {
    const { data } = await axiosInstance.post<AddPaymentResponse>(API_ROUTES.PAYMENTS.CREATE, payload);
    return data;
  } catch (error: any) {
    console.log(error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Failed to add payment");
  }
};
