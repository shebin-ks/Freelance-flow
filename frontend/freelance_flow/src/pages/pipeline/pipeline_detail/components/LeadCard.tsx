import React from 'react';
import type { Lead } from '../../../../redux/features/commonTypes/commonTypes';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface Props {
    lead: Lead;
    nextStatus: string | null;
    onMove: (lead: Lead, nextStatus: string) => void;
}




const LeadCard: React.FC<Props> = ({ lead, nextStatus, onMove }) => {
    const createdDate = new Date(lead.createdAt);
    const formattedDate = format(createdDate, 'PPP');

    

    return (
        <div className="border bg-gray-50 border-gray-200 flex flex-col gap-3 p-3 rounded-md shadow-md">
            <div>
                <h4 className="font-medium text-gray-800">{lead.name}</h4>
                <p className="text-xs text-gray-500">{lead.leadCompanyName}</p>
            </div>

            <div className='flex gap-1'>
                <Calendar className='w-5 h-5 text-gray-600' />
                <span className='text-sm text-gray-600'>{formattedDate}</span>
            </div>
            <div>
                <span className='text-gray-700'>{lead.purpose}</span>
            </div>

            {nextStatus && (
                <button
                    onClick={() => onMove(lead, nextStatus)}
                    className="mt-2 text-xs px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full transition"
                >
                    Move to {nextStatus.replace('_', ' ')}
                </button>
            )}
        </div>
    );
};

export default LeadCard;
