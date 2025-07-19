import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AddCommunicationResponse, CommunicationResponse, CommunicationState } from "./types";
import { getCompanyCommunications, saveCommunication } from "./communicationThunk";
import { clearRedux } from "../clearReducer";



const initialState: CommunicationState = {
    communications: [],
    fetchStatus: 'idle',
    fetchError: null,

    createStatus: 'idle',
    createError: null,

    countAll: 0,
    countFollowupNeeded: 0,
    countCall: 0,
    countEmail: 0,
    countMeeting: 0,
}


const communicationSlice = createSlice({
    name: 'communication',
    initialState,
    reducers: {
        clearCreateStatus(state) {
            state.createStatus = 'idle'
            state.createError = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(clearRedux, () => initialState)

            .addCase(getCompanyCommunications.pending, (state) => {
                state.fetchStatus = 'loading'
                state.fetchError = null
            })
        .addCase(getCompanyCommunications.fulfilled, (state, action: PayloadAction<CommunicationResponse>) => {
            state.fetchStatus = 'succeeded'
            state.communications = action.payload.communications
            const all = action.payload.communications;

            state.countAll = all.length;
            state.countFollowupNeeded = all.filter(comm => comm.followUpNeeded).length;
            state.countCall = all.filter(comm => comm.communicationType === 'call').length;
            state.countEmail = all.filter(comm => comm.communicationType === 'e-mail').length;
            state.countMeeting = all.filter(comm => comm.communicationType === 'meeting').length;
        })
        .addCase(getCompanyCommunications.rejected, (state, action) => {
            state.fetchStatus = 'failed'
            state.fetchError = action.payload as string || 'Failed to fetch communications'
        })

        // --------------  Save Communication ------------
        .addCase(
            saveCommunication.pending,
            (state) => {
                state.createStatus = 'loading'
                state.createError = null
            }
        )
        .addCase(
            saveCommunication.fulfilled,
            (state, action: PayloadAction<AddCommunicationResponse>) => {
                state.createStatus = 'succeeded';

                const communication = action.payload.communication

                if (communication) {

                    state.communications.unshift(communication);

                    state.countAll++;
                    if (communication.followUpNeeded) {

                        state.countFollowupNeeded++
                    }
                    if (communication.communicationType === 'call') {
                        state.countCall++
                    }
                    if (communication.communicationType === 'e-mail') {
                        state.countEmail++
                    }
                    if (communication.communicationType === 'meeting') {
                        state.countMeeting++
                    }
                }
            }
        )
        .addCase(
            saveCommunication.rejected,
            (state, action) => {
                state.createError = action.payload as string || 'Failed to Log communication'
                state.createStatus = 'failed'
            }
        )
}
})


export default communicationSlice.reducer