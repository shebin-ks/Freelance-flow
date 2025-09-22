import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { clearRedux } from "../clearReducer";
import type { Message, MessageResponse, MessagesState } from "./types";
import { getMessages } from "./messageThunk";



const initialState: MessagesState = {
    messages: [],
    messagesStatus: "idle",
    messagesError: null,
};

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload)
        },

        changeMessageStatus: (state, action: PayloadAction<{ byUserId: number; status: "delivered" | "seen" }>) => {
            state.messages = state.messages.map((msg) => {

                if (
                    msg.receiver.id === action.payload.byUserId &&
                    msg.messageStatus !== "seen"
                ) {
                    return { ...msg, messageStatus: action.payload.status };
                }
                return msg;
            });
        },

        updateMessage: (state, action: PayloadAction<Message>) => {
            const index = state.messages.findIndex(
                (msg) => msg.id === action.payload.id
            );
            if (index !== -1) {
                state.messages[index] = action.payload;
            }
        },
        updateUserMessage: (state, action: PayloadAction<number>) => {
            state.messages = state.messages.map((msg) => {
                if (
                    msg.sender.id === action.payload &&
                    msg.messageStatus !== "seen"
                ) {
                    return { ...msg, messageStatus: 'seen' };
                }
                return msg;
            })

        }

    },
    extraReducers: (builder) => {
        builder

            .addCase(clearRedux, () => initialState)

            // ----- Get Messages ---------
            .addCase(getMessages.pending, (state) => {
                state.messagesStatus = "loading";
                state.messagesError = null;
            })
            .addCase(getMessages.fulfilled, (state, action: PayloadAction<MessageResponse>) => {

                state.messagesStatus = "succeeded";

                state.messages = action.payload.messages


            })
            .addCase(getMessages.rejected, (state, action) => {
                state.messagesStatus = "failed";
                state.messagesError = (action.payload as string) || "Failed to load messages";
            })
    },
});


export const { addMessage, changeMessageStatus, updateMessage,updateUserMessage } = messagesSlice.actions

export default messagesSlice.reducer;
