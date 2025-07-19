import type { Lead } from "../commonTypes/commonTypes";

// -------- SLICE TYPES ------------
export interface LeadsState {
    allLeads: TopLead[];
    allLeadsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    allLeadsError: string | null;

    addLeadStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    addLeadError: string | null;

    deleteLeadStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    deleteLeadError: string | null;

    updateStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    updateError: string | null;


    topLeads: TopLead[];
    topLeadsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    topLeadserror: string | null;

    totalInquiry: number;
    totalProposalSent: number;
    totalContractSigned: number;
    totalPaymentDone: number;
}



// ------ API TYPES ---------------

export interface Leadpayload {
    name: string;
    email: string;
    phone: string;
    purpose: string;
    leadCompanyName: string;
}



export interface AddLeadResponse {
    success: boolean;
    message: string;
    lead: Lead
}
export interface DeleteLeadResponse {
    success: boolean;
    message: string;
    leadId: number
}

export interface LeadResponse {
    success: boolean;
    message: string;
    leads: Lead[]

}

export interface TopLead extends Lead {
   
    totalPaid?: number;
}


export interface TopLeadResponse {
    topLeads: TopLead[]
}