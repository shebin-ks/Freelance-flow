import React from 'react';
import { format } from 'date-fns';
import { Building, Mail, Phone, Trash2 } from 'lucide-react';
import { useAppSelector } from '../../../hooks/reduxHooks';
import LoadingIcon from '../../../components/widgets/LoadingIcon';
import type { TopLead } from '../../../redux/features/leads/types';

interface LeadInfoCardProps {
    lead: TopLead;
    onDelete: () => void;
}

const statusColorMap: Record<string, string> = {
    'inquiry': 'bg-blue-100 text-blue-800',
    'proposal_sent': 'bg-yellow-100 text-yellow-800',
    'contract_signed': 'bg-purple-100 text-purple-800',
    'payment_done': 'bg-green-100 text-green-800'
};

const LeadInfoCard: React.FC<LeadInfoCardProps> = ({ lead, onDelete }) => {
    const createdDate = new Date(lead.createdAt);
    const formattedDate = format(createdDate, 'PPP');

    const statusClass = statusColorMap[lead.status?.toLowerCase()] || 'bg-gray-100 text-gray-800';

    const { deleteLeadStatus,deleteLeadId } = useAppSelector(state => state.leads);



    return (
        <div className="flex flex-col p-4 gap-4 justify-between rounded-md border bg-white border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{lead.name}</h2>
                    <p className="text-sm text-gray-500">{lead.leadCompanyName || 'No company'}</p>
                </div>
                <div className="flex gap-5 items-center">
                    {deleteLeadStatus === 'loading'&& deleteLeadId === lead.id ? (
                        <LoadingIcon color="red" />
                    ) : (
                        <Trash2
                            onClick={onDelete}
                            className="w-5 h-5 cursor-pointer text-red-600 hover:text-red-800"
                        />
                    )}
                </div>
            </div>


            <div className="flex items-center gap-2 text-sm text-gray-700">
                <Mail className="w-4 h-4 text-gray-500" />
                {lead.email || 'No email'}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
                <Phone className="w-4 h-4 text-gray-500" />
                {lead.phone || 'No phone'}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
                <Building className="w-4 h-4 text-gray-500" />
                {lead.leadCompanyName || 'N/A'}
            </div>

            {lead.purpose && (
                <div className="text-sm text-gray-700 bg-gray-100 p-2 rounded-md">
                    <strong className="block text-gray-800 mb-1">Purpose</strong>
                    <p>{lead.purpose}</p>
                </div>
            )}

            <span
                className={`w-min whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}
            >
                {lead.status}
            </span>
            {lead.totalPaid !== 0 && (
                <div className="text-sm text-gray-700 bg-gray-100 p-2 rounded-md">
                    <strong className="block text-gray-800 mb-1">Total Revenue</strong>
                    <p>{lead.totalPaid}</p>
                </div>
            )}

            <div className="text-sm text-gray-600">
                <span>Added on: {formattedDate}</span>
            </div>
        </div>
    );
};

export default LeadInfoCard;
