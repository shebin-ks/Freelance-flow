import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { getLeads, updateLeadStatus } from '../../../redux/features/leads/leadThunk';
import type { Lead } from '../../../redux/features/commonTypes/commonTypes';
import StatusColumn from './components/StatusColumn';
import type { LeadStatusPayload } from '../../../redux/features/pipeline/types';
import { resetUpdateLeadStatus } from '../../../redux/features/leads/leadSlice';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import SearchBar from '../../../components/pages/SearchBar';

const getNextStatus = (status: string): string | null => {
    switch (status) {
        case 'inquiry': return 'proposal_sent';
        case 'proposal_sent': return 'contract_signed';
        case 'contract_signed': return 'payment_done';
        default: return null;
    }
};

const PipelineDetail: React.FC = () => {
    const dispatch = useAppDispatch();
    const { allLeads, allLeadsStatus } = useAppSelector(state => state.leads);
    const [searchTerm, setSearchTerm] = useState('');
    const { updateStatus, updateError } = useAppSelector(state => state.leads);

    const filteredLeads = allLeads.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedLeads: Record<string, Lead[]> = {
        inquiry: [],
        proposal_sent: [],
        contract_signed: [],
        payment_done: [],
    };

    filteredLeads.forEach(lead => {
        groupedLeads[lead.status]?.push(lead);
    });

    useEffect(() => {
        if (allLeadsStatus === 'idle') {
            dispatch(getLeads());
        }
    }, [dispatch, allLeadsStatus]);

    useEffect(() => {
        if (updateStatus === 'succeeded') {
            toast.success('Lead moved to next stage!');
            dispatch(resetUpdateLeadStatus());
        } else if (updateStatus === 'failed') {
            toast.error(updateError);
            dispatch(resetUpdateLeadStatus());
        }
    }, [updateStatus]);


    const handleMove = (lead: Lead, nextStatus: string) => {
        Swal.fire({
            title: 'Move Lead?',
            text: `Are you sure you want to move ${lead.name} from ${lead.status.replace('_', ' ')} to ${nextStatus.replace('_', ' ')}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, move it!',
        }).then((result) => {
            if (result.isConfirmed) {
                const payload: LeadStatusPayload = {
                    leadId: lead.id,
                    status: nextStatus,
                };
                dispatch(updateLeadStatus(payload));
            }
        });
    };

    return (
        <div className="space-y-6">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(groupedLeads).map(([status, leads]) => (
                    <StatusColumn
                        key={status}
                        status={status}
                        leads={leads}
                        getNextStatus={getNextStatus}
                        onMove={handleMove}
                    />
                ))}
            </div>
        </div>
    );
};

export default PipelineDetail;
