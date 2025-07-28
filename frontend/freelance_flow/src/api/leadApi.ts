import type { AddLeadResponse, DeleteLeadResponse, Leadpayload, LeadResponse, TopLeadResponse } from "../redux/features/leads/types";
import { API_ROUTES } from "./apiRoutes";
import axiosInstance from "./axiosInstance";

export const createLead = async (payload: Leadpayload) => {
  try {
    const { data } = await axiosInstance.post<AddLeadResponse>(API_ROUTES.LEADS.CREATE, payload);
    console.log(data);
    return data;
  } catch (error: any) {
    console.log("error");
    throw new Error(error.response?.data?.message || "Failed to add Lead");
  }
};

export const deleteLead = async (leadId: number) => {
  try {

    const { data } = await axiosInstance.delete<DeleteLeadResponse>(`${API_ROUTES.LEADS.DELETE}/${leadId}`);
    console.log(data);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete leads");
  }
};

export const fetchLeads = async () => {
  try {
    const { data } = await axiosInstance.get<TopLeadResponse>(API_ROUTES.LEADS.GET_ALL);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch leads");
  }
};

export const fetchTopLeads = async () => {
  try {
    const { data } = await axiosInstance.get<TopLeadResponse>(API_ROUTES.LEADS.TOP_LEADS);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch top leads");
  }
};


export const importLeads = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post<LeadResponse>(
      API_ROUTES.LEADS.UPLOAD_LEADS, formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to upload excel file");

  }
}