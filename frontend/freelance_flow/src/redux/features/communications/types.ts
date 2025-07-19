import type { CreatedBy, Lead, Pagination } from "../commonTypes/commonTypes";


// -------- SLICE TYPES ------------

export interface CommunicationState {

    communications: Communication[];
    fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    fetchError: string | null;

    createStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    createError: string | null;

    countAll: number;
    countFollowupNeeded: number;
    countCall: number;
    countEmail: number;
    countMeeting: number;
}



// ------ API TYPES ---------------

export interface Communication {
    id: number;
    communicationType: 'call' | 'e-mail' | 'meeting';
    note: string | null;
    outcome: string | null;
    followUpNeeded: string | null;
    createdAt: string;
    createdBy: CreatedBy;
    lead: Lead;
}

export interface CommunicationResponse {
    success: boolean;
    message: string;
    communications: Communication[];
    pagination?: Pagination;
}


// -----------  Add Communication -------

export interface CommuncationPayload {
    leadId: number;
    communicationType: string;
    note: string;
    outcome?: string | null;
    followUpNeeded?: string | null;
}

export interface AddCommunicationResponse {
    success: boolean;
    message: string;
    communication: Communication;

}