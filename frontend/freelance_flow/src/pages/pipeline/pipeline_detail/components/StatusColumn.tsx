import React from 'react';
import LeadCard from './LeadCard';
import type { Lead } from '../../../../redux/features/commonTypes/commonTypes';

interface Props {
    status: string;
    leads: Lead[];
    getNextStatus: (status: string) => string | null;
    onMove: (lead: Lead, nextStatus: string) => void;
}

const leadStatusStyles: Record<string, string> = {
    inquiry: 'bg-blue-50',
    proposal_sent: 'bg-orange-50',
    contract_signed: 'bg-purple-50',
    payment_done: 'bg-green-50',
};

const StatusColumn: React.FC<Props> = ({ status, leads, getNextStatus, onMove }) => {
    const bgColor = leadStatusStyles[status] || 'bg-gray-100';

    return (
        <div className={`${bgColor} p-4 border border-gray-100 rounded-md shadow-sm space-y-4`}>
            <h3 className="text-lg font-semibold capitalize text-gray-700">
                {status.replace('_', ' ')}
            </h3>

            {leads.length === 0 ? (
                <div className="flex justify-center items-center h-20">
                    <p className="text-sm text-center text-gray-600 font-medium">No leads</p>
                </div>
            ) : (

                leads.map(lead => (
                    <LeadCard
                        key={lead.id}
                        lead={lead}
                        nextStatus={getNextStatus(lead.status)}
                        onMove={onMove}
                    />
                ))
            )}
        </div>
    );
};

export default StatusColumn;
