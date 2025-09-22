import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
    AddLeadResponse,
    DeleteLeadResponse,
    LeadResponse,
    LeadsState,
    TopLead,
    TopLeadResponse,
} from "./types";
import {
    addLead,
    getLeads,
    getTopLeads,
    removeLead,
    updateLeadStatus,
    uploadLeadsExcel,
} from "./leadThunk";
import { clearRedux } from "../clearReducer";
import type { Lead } from "../commonTypes/commonTypes";



const initialState: LeadsState = {
    allLeads: [],
    allLeadsStatus: "idle",
    allLeadsError: null,

    addLeadStatus: "idle",
    addLeadError: null,

    deleteLeadStatus: "idle",
    deleteLeadError: null,

    deleteLeadId: null,

    topLeads: [],
    topLeadsStatus: "idle",
    topLeadserror: null,

    updateStatus: "idle",
    updateError: null,

    totalInquiry: 0,
    totalProposalSent: 0,
    totalContractSigned: 0,
    totalPaymentDone: 0,
};

const leadsSlice = createSlice({
    name: "leads",
    initialState,
    reducers: {
        resetAddLeadStatus(state) {
            state.addLeadStatus = "idle";
            state.addLeadError = null;
        },
        resetDeleteLeadStatus(state) {
            state.deleteLeadStatus = "idle";
            state.deleteLeadError = null;
        },
        resetUpdateLeadStatus(state) {
            state.updateStatus = "idle";
            state.updateError = null;
        },
        removeLeadLocally(state, action: PayloadAction<number>) {
            const removedLead = state.allLeads.find(lead => lead.id === action.payload);
            if (removedLead) {
                switch (removedLead.status) {
                    case "inquiry":
                        state.totalInquiry--;
                        break;
                    case "proposal_sent":
                        state.totalProposalSent--;
                        break;
                    case "contract_signed":
                        state.totalContractSigned--;
                        break;
                    case "payment_done":
                        state.totalPaymentDone--;
                        break;
                }
            }
            state.allLeads = state.allLeads.filter(lead => lead.id !== action.payload);
        },
        addLeadLocally(state, action: PayloadAction<{ lead: Lead; currentUserId: number }>) {
            const { lead, currentUserId } = action.payload;

            if (lead.createdBy.id === currentUserId) return;

            const alreadyExists = state.allLeads.some((l) => l.id === lead.id);
            if (alreadyExists) return;

            state.allLeads.unshift(lead);
            switch (lead.status) {
                case "inquiry":
                    state.totalInquiry++;
                    break;
                case "proposal_sent":
                    state.totalProposalSent++;
                    break;
                case "contract_signed":
                    state.totalContractSigned++;
                    break;
                case "payment_done":
                    state.totalPaymentDone++;
                    break;
            }
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(clearRedux, () => initialState)

            // ----- Add Lead ---------
            .addCase(addLead.pending, (state) => {
                state.addLeadStatus = "loading";
                state.addLeadError = null;
            })
            .addCase(addLead.fulfilled, (state, action: PayloadAction<AddLeadResponse>) => {
                const newLead: TopLead = {
                    ...action.payload.lead,
                    totalPaid: 0,
                };
                state.allLeads.unshift(newLead);
                state.addLeadStatus = "succeeded";

                switch (newLead.status) {
                    case "inquiry":
                        state.totalInquiry++;
                        break;
                    case "proposal_sent":
                        state.totalProposalSent++;
                        break;
                    case "contract_signed":
                        state.totalContractSigned++;
                        break;
                    case "payment_done":
                        state.totalPaymentDone++;
                        break;
                }
            })
            .addCase(addLead.rejected, (state, action) => {
                state.addLeadStatus = "failed";
                state.addLeadError = (action.payload as string) || "Failed to add leads";
            })

            // --------- Delete Lead -----------
            .addCase(removeLead.pending, (state, action) => {
                state.deleteLeadStatus = "loading";
                state.deleteLeadError = null;
                state.deleteLeadId = action.meta.arg
            })
            .addCase(removeLead.fulfilled, (state, action: PayloadAction<DeleteLeadResponse>) => {
                const leadId = action.payload.leadId;
                const removedLead = state.allLeads.find((lead) => lead.id === leadId);

                if (removedLead) {
                    switch (removedLead.status) {
                        case "inquiry":
                            state.totalInquiry--;
                            break;
                        case "proposal_sent":
                            state.totalProposalSent--;
                            break;
                        case "contract_signed":
                            state.totalContractSigned--;
                            break;
                        case "payment_done":
                            state.totalPaymentDone--;
                            break;
                    }
                }

                state.allLeads = state.allLeads.filter((lead) => lead.id !== leadId);
                state.deleteLeadStatus = "succeeded";
            })
            .addCase(removeLead.rejected, (state, action) => {
                state.deleteLeadStatus = "failed";
                state.deleteLeadError = (action.payload as string) || "Failed to delete lead";
            })

            // ----- Get All Leads ---------
            .addCase(getLeads.pending, (state) => {
                state.allLeadsStatus = "loading";
                state.allLeadsError = null;
            })
            .addCase(getLeads.fulfilled, (state, action: PayloadAction<TopLeadResponse>) => {
                state.allLeads = action.payload.topLeads;
                state.allLeadsStatus = "succeeded";

                state.totalInquiry = 0;
                state.totalProposalSent = 0;
                state.totalContractSigned = 0;
                state.totalPaymentDone = 0;

                state.allLeads.forEach((lead) => {
                    switch (lead.status) {
                        case "inquiry":
                            state.totalInquiry++;
                            break;
                        case "proposal_sent":
                            state.totalProposalSent++;
                            break;
                        case "contract_signed":
                            state.totalContractSigned++;
                            break;
                        case "payment_done":
                            state.totalPaymentDone++;
                            break;
                    }
                });
            })
            .addCase(getLeads.rejected, (state, action) => {
                state.allLeadsStatus = "failed";
                state.allLeadsError = (action.payload as string) || "Failed to fetch leads";
            })

            // ----- Get Top Leads ---------
            .addCase(getTopLeads.pending, (state) => {
                state.topLeadsStatus = "loading";
                state.topLeadserror = null;
            })
            .addCase(getTopLeads.fulfilled, (state, action: PayloadAction<TopLeadResponse>) => {
                state.topLeadsStatus = "succeeded";
                state.topLeads = action.payload.topLeads;
            })
            .addCase(getTopLeads.rejected, (state, action) => {
                state.topLeadsStatus = "failed";
                state.topLeadserror = (action.payload as string) || "Failed to fetch top leads";
            })

            // ----------- Update Lead Status ---------
            .addCase(updateLeadStatus.pending, (state) => {
                state.updateStatus = "loading";
                state.updateError = null;
            })
            .addCase(updateLeadStatus.fulfilled, (state, action: PayloadAction<AddLeadResponse>) => {
                state.updateStatus = "succeeded";
                const updatedLead = action.payload.lead;

                const existing = state.allLeads.find((lead) => lead.id === updatedLead.id);
                if (existing) {
                    switch (existing.status) {
                        case "inquiry":
                            state.totalInquiry--;
                            break;
                        case "proposal_sent":
                            state.totalProposalSent--;
                            break;
                        case "contract_signed":
                            state.totalContractSigned--;
                            break;
                        case "payment_done":
                            state.totalPaymentDone--;
                            break;
                    }

                    existing.status = updatedLead.status;

                    switch (updatedLead.status) {
                        case "inquiry":
                            state.totalInquiry++;
                            break;
                        case "proposal_sent":
                            state.totalProposalSent++;
                            break;
                        case "contract_signed":
                            state.totalContractSigned++;
                            break;
                        case "payment_done":
                            state.totalPaymentDone++;
                            break;
                    }
                }
            })
            .addCase(updateLeadStatus.rejected, (state, action) => {
                state.updateStatus = "failed";
                state.updateError = (action.payload as string) || "Failed to update lead status";
            })


            // ----------- Upload Lead Excel ---------
            .addCase(uploadLeadsExcel.pending, (state) => {
                state.addLeadStatus = "loading";
                state.addLeadError = null;
            })
            .addCase(uploadLeadsExcel.fulfilled, (state, action: PayloadAction<LeadResponse>) => {
                state.addLeadStatus = "succeeded";

                state.allLeads.push(...action.payload.leads);
                state.totalInquiry += action.payload.leads.length;
            })
            .addCase(uploadLeadsExcel.rejected, (state, action) => {
                state.addLeadStatus = "failed";
                state.addLeadError = (action.payload as string) || "Failed to upload leads";
            });

    },
});

export const {
    resetAddLeadStatus,
    resetDeleteLeadStatus,
    resetUpdateLeadStatus,
    removeLeadLocally,
    addLeadLocally,
} = leadsSlice.actions;

export default leadsSlice.reducer;
