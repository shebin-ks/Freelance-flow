import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AddLeadResponse, DeleteLeadResponse, Leadpayload, LeadResponse, TopLeadResponse } from "./types";
import { createLead, deleteLead, fetchLeads, fetchTopLeads, importLeads } from "../../../api/leadApi";
import type { LeadStatusPayload } from "../pipeline/types";
import { changeLeadStatus } from "../../../api/pipeline";


export const addLead = createAsyncThunk<
    AddLeadResponse,
    Leadpayload,
    { rejectValue: string }
>(
    'leads/addLead',
    async (payload, thunkApi) => {
        try {
            const response = await createLead(payload)

            return response
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const removeLead = createAsyncThunk<
    DeleteLeadResponse,
    number,
    { rejectValue: string }
>(
    'leads/removeLead',
    async (leadId, thunkApi) => {
        try {
            const response = await deleteLead(leadId)

            return response
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const getLeads = createAsyncThunk<
    TopLeadResponse,
    void,
    { rejectValue: string }
>(
    'leads/getLeads',
    async (_, thunkApi) => {
        try {
            const response = await fetchLeads()

            return response as TopLeadResponse
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);

        }
    }
)

export const getTopLeads = createAsyncThunk<
    TopLeadResponse,
    void,
    { rejectValue: string }
>(
    'leads/getTopLeads',
    async (_, thunkApi) => {
        try {
            const response = await fetchTopLeads()

            return response as TopLeadResponse
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);

        }
    }
)


export const updateLeadStatus = createAsyncThunk<
    AddLeadResponse,
    LeadStatusPayload,
    { rejectValue: string }
>(
    'pipeline/updateLeadStatus',
    async (payload, thunkApi) => {
        try {

            const response = await changeLeadStatus(payload)

            return response

        } catch (error: any) {
            console.log("errrrror :  ", error);

            return thunkApi.rejectWithValue(error.message)
        }

    }
)





export const uploadLeadsExcel = createAsyncThunk<
    LeadResponse,
    File,
    { rejectValue: string }
>(
    "leads/uploadLeadsExcel",
    async (file, thunkAPI) => {
        try {
            const response = await importLeads(file)

            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });
