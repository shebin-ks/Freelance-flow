import { createAsyncThunk } from "@reduxjs/toolkit";
import { createReminder, fetchReminders, fetchUpcomingReminders, markReminderAsDone, } from "../../../api/reminderApi";
import type { CreateReminderResponse, ReminderPayload, ReminderResponse } from "./types";

export const saveReminder = createAsyncThunk<
    CreateReminderResponse,
    ReminderPayload,
    { rejectValue: string }
>(
    "reminders/saveReminder",
    async (payload, thunkApi) => {
        try {
            const response = await createReminder(payload)

            return response
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);

        }
    }
)


export const getReminders = createAsyncThunk<
    ReminderResponse,
    void,
    { rejectValue: string }
>(
    "reminders/getReminders",
    async (_, thunkApi) => {
        try {
            const response = await fetchReminders()

            return response
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);

        }
    }
)


export const getUpcommingReminders = createAsyncThunk<
    ReminderResponse,
    number,
    { rejectValue: string }
>(
    "reminders/getUpcommingReminders",
    async (days, thunkApi) => {
        try {
            const response = await fetchUpcomingReminders(days)

            return response
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);

        }
    }
)



export const markReminderDone = createAsyncThunk<
    CreateReminderResponse,
    number,
    { rejectValue: string }
>(
    'reminders/markDone',
    async (reminderId, thunkAPI) => {
        try {
            const response = await markReminderAsDone(reminderId);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || 'Failed to mark reminder as done');
        }
    }
);
