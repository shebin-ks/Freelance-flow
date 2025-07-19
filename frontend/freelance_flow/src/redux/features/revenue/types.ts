import type { CreatedBy, Lead } from "../commonTypes/commonTypes";


// ---------- SLICE TYPES ---------

export interface PaymentState {
    payments: Payment[]
    paymentsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    paymentsError: string | null;

    addPaymentStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    addPaymentError: string | null;


    totalRevenue: number;
    thisMonth: number;
    totalTransactions: number
}




// ------ API TYPES ---------------
export interface Payment {
    id: number,
    amount: number,
    note: string,
    createdAt: string,
    lead: Lead,
    createdBy: CreatedBy

}

export interface PaymentResponse {
    success: boolean,
    message: string,
    payments: Payment[]
}

export interface PaymentPayload {
    leadId: number;
    note: string;
    createdAt: string;
    amount: number
}

export interface AddPaymentResponse {
    success: boolean,
    message: string,
    payment: Payment
}