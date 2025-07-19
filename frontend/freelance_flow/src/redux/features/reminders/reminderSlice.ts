import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CreateReminderResponse, ReminderResponse, ReminderState } from "./types";
import { getReminders, getUpcommingReminders, markReminderDone, saveReminder } from "./reminderThunk";
import { clearRedux } from "../clearReducer";


const initialState: ReminderState = {
    allReminders: [],
    allRemindersStatus: 'idle',
    allRemindersError: null,

    countAll: 0,
    countUpcoming: 0,
    countOverdue: 0,
    countCompleted: 0,

    upcomingReminders: [],
    upcomingRemindersStatus: 'idle',
    upcomingRemindersError: null,

    createStatus: 'idle',
    createError: null,

    createdReminder: null,

    reminderUpdateStatus: 'idle',
    reminderUpdateError: null,


}

const reminderSlice = createSlice({
    name: 'reminder',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(clearRedux, () => initialState)

            // ---------- CREATE REMINDER -------------

            .addCase(
                saveReminder.pending,
                (state) => {
                    state.createStatus = 'loading';
                    state.createError = null
                }
            )
            .addCase(
                saveReminder.fulfilled,
                (state, action: PayloadAction<CreateReminderResponse>) => {
                    state.createdReminder = action.payload.reminder;
                    state.createStatus = 'succeeded'



                    if (state.createdReminder) {

                        state.allReminders.unshift(state.createdReminder);

                        state.countAll++;
                        if (state.createdReminder.isCompleted) {
                            state.countCompleted++;
                        } else if (new Date(state.createdReminder.reminderAt) < new Date()) {
                            state.countOverdue++;
                        } else {
                            state.countUpcoming++;
                        }
                    }
                }
            )
            .addCase(
                saveReminder.rejected,
                (state, action) => {
                    state.createStatus = 'failed';
                    state.createError = action.payload as string || 'Failed to create reminder'
                }
            )

            // -----------  All Reminders -----------

            .addCase(
                getReminders.pending,
                (state) => {
                    state.allRemindersStatus = 'loading';
                    state.allRemindersError = null
                }
            )
            .addCase(
                getReminders.fulfilled,
                (state, action: PayloadAction<ReminderResponse>) => {
                    state.allReminders = action.payload.reminders
                    state.allRemindersStatus = 'succeeded'
                    state.allRemindersError = null
                    state.countAll = state.allReminders.length;
                    state.countUpcoming = state.allReminders.filter(
                        r => !r.isCompleted && new Date(r.reminderAt) >= new Date()
                    ).length;
                    state.countOverdue = state.allReminders.filter(
                        r => !r.isCompleted && new Date(r.reminderAt) < new Date()
                    ).length;
                    state.countCompleted = state.allReminders.filter(r => r.isCompleted).length;

                }
            )
            .addCase(
                getReminders.rejected,
                (state, action) => {
                    state.allRemindersError = action.payload as string || 'Failed to fetch reminders'
                    state.allRemindersStatus = 'failed'
                }
            )

            //-------------- Upcomming Reminders --------
            .addCase(
                getUpcommingReminders.pending,
                (state) => {
                    state.upcomingRemindersStatus = 'loading'
                    state.upcomingRemindersError = null
                }
            )
            .addCase(
                getUpcommingReminders.fulfilled,
                (state, action: PayloadAction<ReminderResponse>) => {
                    state.upcomingReminders = action.payload.reminders
                    state.upcomingRemindersStatus = 'succeeded'
                }
            )
            .addCase(
                getUpcommingReminders.rejected,
                (state, action) => {
                    state.upcomingRemindersStatus = 'failed';
                    state.upcomingRemindersError = action.payload as string || 'Failed to fetch upcomming reminders'
                }
            )


            //------- Mark reminder as done ------
            .addCase(markReminderDone.pending, (state) => {
                state.reminderUpdateStatus = 'loading';
                state.reminderUpdateError = null;
            })
            .addCase(markReminderDone.fulfilled, (state, action: PayloadAction<CreateReminderResponse>) => {
                state.reminderUpdateStatus = 'succeeded';
                const updatedReminder = action.payload.reminder;

                const reminderIndex = state.allReminders.findIndex(r => r.id === updatedReminder.id);
                if (reminderIndex !== -1) {
                    const reminder = state.allReminders[reminderIndex];

                    if (!reminder.isCompleted) {
                        reminder.isCompleted = true;

                        state.countCompleted++;

                        const isOverdue = new Date(reminder.reminderAt) < new Date();
                        if (isOverdue) {
                            state.countOverdue--;
                        } else {
                            state.countUpcoming--;
                        }
                    }
                }
            })

            .addCase(markReminderDone.rejected, (state, action) => {
                state.reminderUpdateStatus = 'failed';
                state.reminderUpdateError = action.payload || 'Failed to mark reminder as done';
            });
    }

})

export default reminderSlice.reducer