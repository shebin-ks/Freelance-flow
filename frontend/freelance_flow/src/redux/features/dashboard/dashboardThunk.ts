import { createAsyncThunk } from "@reduxjs/toolkit";
import type { DashboardSummaryResponse } from "./types";
import { fetchDashboardSummary } from "../../../api/dashboardApi";


export const getDashboardSummary = createAsyncThunk<
    DashboardSummaryResponse,
    void,
    { rejectValue: string }
>(
    "dashboard/getDashboardSummary",
    async (_, thunkApi) => {
        try {
            const response = await fetchDashboardSummary();
            return response as DashboardSummaryResponse

        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }

    }
)