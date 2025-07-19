import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCommunication, fetchCompanyCommunications } from "../../../api/communicationsApi";
import type { AddCommunicationResponse, CommuncationPayload, CommunicationResponse } from "./types";

export const getCompanyCommunications = createAsyncThunk<
    CommunicationResponse,
    void,
    { rejectValue: string }
>(
    'communication/getCompanyCommunications',
    async (_, thunkApi) => {
        try {

            const response = await fetchCompanyCommunications();
            return response as CommunicationResponse

        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
)

export const saveCommunication = createAsyncThunk<
    AddCommunicationResponse,
    CommuncationPayload,
    { rejectValue: string }
>(
    'communication/saveCommunication',
    async (payload, thunkApi) => {
        try {
            const response = await addCommunication(payload)

            return response
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)