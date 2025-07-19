import { Calendar } from 'lucide-react';
import React from 'react';
import CommunicationType from '../../../../components/widgets/CommunicationType';
import type { Reminder } from '../../../../redux/features/reminders/types';
import CommunicationTypeIcon from '../../../../components/widgets/communicationTypeIcon';
import { format } from 'date-fns';
import ReminderStatus from './widgets/ReminderStatus';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { markReminderDone } from '../../../../redux/features/reminders/reminderThunk';
import LoadingIcon from '../../../../components/widgets/LoadingIcon';

interface FollowupInfoCardProps {
    reminder: Reminder;
}

const FollowupInfoCard: React.FC<FollowupInfoCardProps> = ({ reminder }) => {
    const now = new Date();
    const reminderDate = new Date(reminder.reminderAt);
    const formattedDateTime = format(reminderDate, 'PPPp');
    const isOverdue = !reminder.isCompleted && reminderDate < now;


    const dispatch = useAppDispatch()
    const { reminderUpdateStatus } = useAppSelector(state => state.reminders)
    const handleMarkDone = () => {
        Swal.fire({
            title: 'Mark as done?',
            text: `Are you sure you want to mark reminder for ${reminder.lead.name} as done?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, mark as done!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(markReminderDone(reminder.id))
            }
        });
    };

    return (
        <div
            className={`flex p-4 justify-between rounded-md border
      ${reminder.isCompleted ? 'bg-green-50 border-green-300' : isOverdue ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}
        >
            <div className="flex gap-4">
                <CommunicationTypeIcon type={reminder.reminderType} />
                <div className="flex flex-col gap-2 text-[1rem] text-black">
                    <div className="flex items-center gap-3">
                        <span className="font-[450]">{reminder.note}</span>
                        <CommunicationType communicationType={reminder.reminderType} />
                    </div>
                    <p className="text-sm font-medium text-gray-600">Contact: {reminder.lead.name}</p>

                    <p className="text-sm text-gray-600">Explore funding options and potential scope adjustments</p>
                    <div className="flex mt-3 items-center text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <p className="text-sm ml-2">{formattedDateTime}</p>
                        <ReminderStatus reminder={reminder} />
                    </div>
                </div>
            </div>

            <div className="flex gap-5 items-center">
                {!reminder.isCompleted && (
                    reminderUpdateStatus === 'loading' ? (
                        <LoadingIcon />
                    ) : (
                        <input
                            type="checkbox"
                            checked={reminder.isCompleted}
                            onChange={handleMarkDone}
                            title="Mark reminder as done"
                            className="w-5 h-5 cursor-pointer"
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default FollowupInfoCard;
