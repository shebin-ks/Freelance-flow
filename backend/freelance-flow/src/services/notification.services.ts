import { io } from "..";

export interface NotificationPayload {
    type: 'LEAD_CREATED' | 'PAYMENT_RECEIVED' | 'REMINDER_ADDED' | 'LEAD_DELETED' | 'LEAD_STATUS_CHANGED' | 'REMINDER_CREATED' | 'REMINDER_COMPLETED';
    message: string;
    data?: any;
    createdAt: string;
}


export const emitCompanyNotification = (companyId: number, payload: NotificationPayload) => {

    io.to(`company-${companyId}`).emit('notification', payload)
}