import React, { useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { getUpcommingReminders } from '../../../../redux/features/reminders/reminderThunk';
import UpcommingFolloupsCard from './UpcommingFolloupsCard';
import LoadingIcon from '../../../../components/widgets/LoadingIcon';

const UpcomingFollowups: React.FC = () => {
    const dispatch = useAppDispatch();

    const reminders = useAppSelector(state => state.reminders.upcomingReminders);
    const status = useAppSelector(state => state.reminders.upcomingRemindersStatus);
    const error = useAppSelector(state => state.reminders.upcomingRemindersError);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getUpcommingReminders(16));
        }

    }, [status, dispatch]);

    return (
        <div className="border border-gray-100 shadow-sm rounded-md p-4 w-full">
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-lg text-gray-800">Upcoming Follow-ups</h1>
                <Calendar className="text-gray-500 w-5 h-5" />
            </div>

            <div className="min-h-[120px] flex flex-col justify-center items-center space-y-3">
                {status === 'loading' && (
                    <div className="flex flex-col items-center justify-center py-8">
                        <LoadingIcon />

                        <p className="text-sm text-gray-500">Loading upcoming reminders...</p>
                    </div>
                )}

                {status === 'failed' && (
                    <p className="text-sm text-red-600 text-center">{error || 'Failed to load follow ups.'}</p>

                )}

                {status === 'succeeded' && reminders.length === 0 && (
                    <p className="text-sm text-gray-500 text-center">No follow-ups found.</p>
                )}

                {status === 'succeeded' && reminders.length > 0 && (
                    <div className="space-y-4 w-full">
                        {reminders.slice(0, 3).map((reminder) => (
                            <UpcommingFolloupsCard
                                key={reminder.id}
                                reminder={reminder}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpcomingFollowups;
