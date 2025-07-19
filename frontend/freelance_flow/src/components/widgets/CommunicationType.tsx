import React from 'react'
import { communicationTypeColors } from '../../utils/communicationTypeColors';

const CommunicationType: React.FC<{ communicationType: string }> = ({ communicationType }) => {
    const type = communicationType.toLowerCase();
    const typeColorClass = communicationTypeColors[type] || 'bg-gray-100 text-gray-800';

    return (
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 text-center cursor-default select-none ${typeColorClass}`}>
            {communicationType || 'N/A'}
        </div>
    )
}

export default CommunicationType