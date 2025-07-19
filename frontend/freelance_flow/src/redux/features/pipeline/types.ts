

// -------- SLICE TYPES ------------

export interface PipelineState {
    overview: Pipeline | null;
    fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    fetchError: string | null;

   
}


// ------ API TYPES ---------------

export interface LeadStatusPayload {
    leadId: number;
    status: string

}

export interface Pipeline {

    inquiry: number;
    proposal_sent: number;
    contract_signed: number;
    payment_done: number

}

export interface PipelineOverviewResponse {
    success: boolean;
    message: string;
    overview: Pipeline
}