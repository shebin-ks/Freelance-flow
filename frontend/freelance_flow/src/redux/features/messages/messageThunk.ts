import { createAsyncThunk } from "@reduxjs/toolkit";
import type { MessageResponse } from "./types";
import { fetchMessages } from "../../../api/messageApi";


export const getMessages = createAsyncThunk<
    MessageResponse,
    void,
    { rejectValue: string }
>(
    'messages/getMessages',
    async (_, thunkApi) => {
        try {
            const response = await fetchMessages()

            return response
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)
