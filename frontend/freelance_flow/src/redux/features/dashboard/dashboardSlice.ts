import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getDashboardSummary } from "./dashboardThunk";
import type { DashboardState, DashboardSummaryResponse } from "./types";
import { clearRedux } from "../clearReducer";




const initialState: DashboardState = {
    summary: null,
    fetchStatus: 'idle',
    fetchError: null,

}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(clearRedux, () => initialState)

            .addCase(
                getDashboardSummary.pending,
                (state) => {
                    state.fetchStatus = 'loading';
                    state.fetchError = null;
                }
            )
            .addCase(
                getDashboardSummary.fulfilled,
                (state, action: PayloadAction<DashboardSummaryResponse>) => {
                    state.summary = action.payload.summary
                    state.fetchStatus = 'succeeded'
                    state.fetchError = null

                }
            )
            .addCase(
                getDashboardSummary.rejected,
                (state, action) => {
                    state.fetchError = action.payload as string || 'Failed to fetch summary'
                    state.fetchStatus = 'failed'
                }
            )
    }
})


export default dashboardSlice.reducer