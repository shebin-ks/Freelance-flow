import type { CreatedBy, Lead } from "../commonTypes/commonTypes";

// -------- SLICE TYPES ------------

export interface ReminderState {
    allReminders: Reminder[];
    allRemindersStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    allRemindersError: string | null;

    countAll: number,
    countUpcoming: number,
    countOverdue: number,
    countCompleted: number,

    createStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    createError: string | null;
    createdReminder: Reminder | null;

    upcomingReminders: Reminder[];
    upcomingRemindersStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    upcomingRemindersError: string | null;

    reminderUpdateStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    reminderUpdateError: string | null;
}



// ------ API TYPES ---------------


export interface ReminderPayload {
    leadId: number;
    note: string;
    reminderAt: string;
    reminderType: string;
}

export interface Reminder {
    id: number;
    reminderType: 'e-mail' | 'call' | 'meeting';
    reminderAt: string;
    note: string;
    isCompleted: boolean;
    createdAt: string;
    lead: Lead;
    createdBy: CreatedBy;
}

export interface ReminderResponse {
    success: boolean,
    message: string,
    reminders: Reminder[]
}

export interface CreateReminderResponse {
    success: boolean,
    message: string,
    reminder: Reminder
}