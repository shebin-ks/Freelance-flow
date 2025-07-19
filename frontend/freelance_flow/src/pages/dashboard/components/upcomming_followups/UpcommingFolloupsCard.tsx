import React from 'react';
import type { Reminder } from '../../../../redux/features/reminders/types';
import { communicationTypeColors } from '../../../../utils/communicationTypeColors';
import CommunicationTypeIcon from '../../../../components/widgets/communicationTypeIcon';



const getTimeRemaining = (reminderAt: string): string => {
    const now = new Date();
    const reminderDate = new Date(reminderAt);
    const diff = reminderDate.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `In ${days} days`;
};

const UpcommingFolloupsCard: React.FC<{ reminder: Reminder }> = ({ reminder }) => {
    const timeRemaining = getTimeRemaining(reminder.reminderAt);
    const colorClass = communicationTypeColors[reminder.reminderType] || 'bg-gray-100 text-gray-800';

    return (
        <div className='flex bg-gray-50 px-4 py-4 rounded-md justify-between items-center cursor-pointer hover:shadow-md  hover:bg-gray-100'>
            <div className='flex items-center gap-6'>
                <CommunicationTypeIcon type={reminder.reminderType}/>
                <div>
                    <p className="font-medium text-gray-800">{reminder.note}</p>
                    <p className="text-sm text-gray-500">
                        {reminder.lead.name} • {new Date(reminder.reminderAt).toDateString()}
                    </p>
                    <span className={`mt-1 inline-block px-2 py-0.5 rounded text-xs font-semibold ${colorClass}`}>
                        {reminder.reminderType}
                    </span>
                </div>
            </div>
            <p className="text-sm font-medium text-gray-700 text-right whitespace-nowrap">
                {timeRemaining}
            </p>
        </div>
    );
};

export default UpcommingFolloupsCard;
