import type { LeadStatusPayload, PipelineOverviewResponse } from '../redux/features/pipeline/types';
import axiosInstance from './axiosInstance';
import { API_ROUTES } from './apiRoutes';
import type { AddLeadResponse } from '../redux/features/leads/types';

export const fetchPipelineOverview = async () => {
    try {
        const response = await axiosInstance.get<PipelineOverviewResponse>(API_ROUTES.PIPELINE.OVERVIEW);
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Failed to fetch pipeline overview');
    }
};

export const changeLeadStatus = async (payload: LeadStatusPayload) => {
    try {
        const response = await axiosInstance.patch<AddLeadResponse>(API_ROUTES.LEADS.UPDATE_STATUS, payload);
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || 'Failed to update lead status');
    }
};
