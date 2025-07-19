import React from 'react';
import { Phone, Mail, Users } from 'lucide-react';
import { communicationTypeColors } from '../../utils/communicationTypeColors';

interface Props {
    type: 'call' | 'e-mail' | 'meeting';
}

const iconMap: Record<string, React.ReactNode> = {
    call: <Phone className="w-5 h-5" />,
    'e-mail': <Mail className="w-5 h-5" />,
    meeting: <Users className="w-5 h-5" />,
};

const CommunicationTypeIcon: React.FC<Props> = ({ type }) => {
    const bgAndText = communicationTypeColors[type] || 'bg-gray-100 text-gray-700';

    return (
        <div className={`${bgAndText} p-2 rounded-md h-min`}>
            {iconMap[type]}
        </div>


    );
};

export default CommunicationTypeIcon;
