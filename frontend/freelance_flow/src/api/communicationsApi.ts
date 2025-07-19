import type { AddCommunicationResponse, CommuncationPayload, CommunicationResponse } from "../redux/features/communications/types";
import { API_ROUTES } from "./apiRoutes";
import axiosInstance from "./axiosInstance";

export const fetchCompanyCommunications = async () => {
    try {
        const response = await axiosInstance.get<CommunicationResponse>(API_ROUTES.COMMUNICATIONS.GET_BY_COMPANY);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch communications');
    }
};

export const addCommunication = async (payload: CommuncationPayload) => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    await delay(5000);

    try {
        const response = await axiosInstance.post<AddCommunicationResponse>(API_ROUTES.COMMUNICATIONS.CREATE, payload);
        const data = response.data;

        if (data?.success === false) {
            throw new Error(data?.message || 'Failed to add Communication Log');
        }

        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to add Communication Log');
    }
};
