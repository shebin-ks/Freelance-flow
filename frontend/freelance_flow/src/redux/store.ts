import { configureStore } from "@reduxjs/toolkit";
import communicationReducer from "./features/communications/communicationSlice";
import leadsReducer from "./features/leads/leadSlice";
import reminderReducer from "./features/reminders/reminderSlice";
import pipelineReducer from "./features/pipeline/pipelineSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";
import paymentReducer from "./features/revenue/revenueSlice";
import authReducer from "./features/auth/authSlice";
import usersReducer from "./features/users/usersSlice";
import rootReducer from './rootReducer';


// export const store = configureStore({
//     reducer: {
//         communication: communicationReducer,
//         leads: leadsReducer,
//         reminders: reminderReducer,
//         pipeline: pipelineReducer,
//         dashboard: dashboardReducer,
//         payments:paymentReducer,
//         auth:authReducer,
//         users:usersReducer,
//     }
// })


export const store = configureStore({
    reducer: rootReducer,
});



export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch