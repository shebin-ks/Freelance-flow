import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPipelineOverview } from "../../../api/pipeline";
import type { PipelineOverviewResponse } from "./types";


export const getPipelineOverview = createAsyncThunk<
    PipelineOverviewResponse,
    void,
    { rejectValue: string }
>(
    "pipeline/getPipelineOverview",
    async (_, thunkApi) => {
        try {
            const response = await fetchPipelineOverview()

            return response
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

