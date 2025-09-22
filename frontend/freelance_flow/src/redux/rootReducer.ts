import { combineReducers } from '@reduxjs/toolkit';
import communicationReducer from "./features/communications/communicationSlice";
import leadsReducer from "./features/leads/leadSlice";
import reminderReducer from "./features/reminders/reminderSlice";
import pipelineReducer from "./features/pipeline/pipelineSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";
import paymentReducer from "./features/revenue/revenueSlice";
import authReducer from "./features/auth/authSlice";
import usersReducer from "./features/users/usersSlice";
import messagesReducer from "./features/messages/messageSlice";
import notificationReducer from "./features/notification/notificationSlice";
import { clearRedux } from './features/clearReducer';

const appReducer = combineReducers({
    communication: communicationReducer,
    leads: leadsReducer,
    reminders: reminderReducer,
    pipeline: pipelineReducer,
    dashboard: dashboardReducer,
    payments: paymentReducer,
    auth: authReducer,
    users: usersReducer,
    messages: messagesReducer,
    notification: notificationReducer,
});


const rootReducer = (state: any, action: any) => {
    if (action.type === clearRedux.type) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
