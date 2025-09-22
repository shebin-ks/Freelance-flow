import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Notification, NotificationState } from "./types";



const initialState: NotificationState = {
    fetchStatus: 'idle',
    notifications: [],
};

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notification>) => {
            state.notifications.unshift(action.payload);
        },
        markAllAsSeen: (state) => {
            state.notifications.forEach(n => n.seen = true);
        },
        loadNotifications: (state, action: PayloadAction<Notification[]>) => {
            state.notifications = action.payload

            state.fetchStatus = 'succeeded'
        }
    },
});

export const {
    addNotification,
    markAllAsSeen,
    loadNotifications
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
