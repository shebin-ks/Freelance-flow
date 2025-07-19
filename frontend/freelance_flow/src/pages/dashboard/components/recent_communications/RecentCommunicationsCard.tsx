import React from 'react';
import type { Communication } from '../../../../redux/features/communications/types';
import CommunicationType from '../../../../components/widgets/CommunicationType';



const typeDotColors: Record<string, string> = {
    'call': 'bg-blue-500',
    'e-mail': 'bg-green-500',
    'meeting': 'bg-yellow-500',
};

const RecentCommunicationsCard: React.FC<{ communication: Communication }> = ({ communication }) => {
    const createdDate = new Date(communication.createdAt);
    const daysAgo = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));

    const type = communication.communicationType.toLowerCase();
    const dotColorClass = typeDotColors[type] || 'bg-gray-400';

    return (
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm hover:bg-gray-100 hover:shadow-md cursor-pointer transition-shadow duration-200">
            <div className="flex items-center gap-4">
                <span
                    className={`w-3 h-3 rounded-full ${dotColorClass}`}
                    aria-label="Communication type indicator"
                    role="status"
                />
                <div>
                    <h2 className="text-sm font-semibold text-gray-900">{communication.lead.name}</h2>
                    <p className="text-sm text-gray-600 mt-0.5">{communication.note || 'No note provided'}</p>
                    <CommunicationType communicationType={communication.communicationType} />
                </div>
            </div>
            <div className="text-right">
                <p className="text-xs text-gray-500 tracking-wide">{daysAgo} days ago</p>
            </div>
        </div>
    );
};

export default RecentCommunicationsCard;
