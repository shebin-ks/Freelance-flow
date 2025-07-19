import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getPipelineOverview } from "./pipelineThunk";
import type { PipelineOverviewResponse, PipelineState } from "./types";
import { clearRedux } from "../clearReducer";

const initialState: PipelineState = {
    overview: null,
    fetchStatus: 'idle',
    fetchError: null,



}

const pipelineSlice = createSlice({
    name: 'pipeline',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(clearRedux, () => initialState)

            .addCase(
                getPipelineOverview.pending,
                (state) => {
                    state.fetchStatus = 'loading'
                    state.fetchError = null

                }
            )
            .addCase(
                getPipelineOverview.fulfilled,
                (state, action: PayloadAction<PipelineOverviewResponse>) => {

                    state.fetchStatus = 'succeeded'
                    state.overview = action.payload.overview

                }
            )
            .addCase(
                getPipelineOverview.rejected,
                (state, action) => {
                    state.fetchStatus = 'failed'
                    state.fetchError = action.payload as string || 'Failed to fetch pipeline overview'
                }
            )



    }
})


export default pipelineSlice.reducer