import React, { useEffect, useState } from 'react';
import FollowupInfoCard from './FollowupInfoCard';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { getReminders } from '../../../../redux/features/reminders/reminderThunk';
import LoadingIcon from '../../../../components/widgets/LoadingIcon';
import SearchBar from '../../../../components/pages/SearchBar';

const FollowUpDetail: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState('');

    const dispatch = useAppDispatch();
    const {
        allReminders,
        allRemindersError,
        allRemindersStatus,
        countAll,
        countUpcoming,
        countOverdue,
        countCompleted
    } = useAppSelector(state => state.reminders);

    const tabs = [
        { label: 'All', count: countAll },
        { label: 'Upcoming', count: countUpcoming },
        { label: 'Overdue', count: countOverdue },
        { label: 'Completed', count: countCompleted },
    ];

    useEffect(() => {
        if (allRemindersStatus === 'idle') {
            dispatch(getReminders());
        }
    }, [dispatch, allRemindersStatus]);

    const filteredReminders = allReminders.filter(reminder => {
        const matchesSearch = reminder.lead.name.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        switch (activeTab) {
            case 'Upcoming':
                return !reminder.isCompleted && new Date(reminder.reminderAt) >= new Date();
            case 'Overdue':
                return !reminder.isCompleted && new Date(reminder.reminderAt) < new Date();
            case 'Completed':
                return reminder.isCompleted;
            case 'All':
            default:
                return true;
        }
    });

    return (
        <div className="flex flex-col gap-5">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="border border-gray-100 shadow-md bg-white rounded-md overflow-hidden">

                <div className="flex gap-12 border-b border-gray-200 px-4 py-3">
                    {tabs.map((tab, index) => {
                        const isActive = tab.label === activeTab;
                        return (
                            <div
                                key={index}
                                onClick={() => setActiveTab(tab.label)}
                                className={`flex items-center gap-2 cursor-pointer pb-2
                                ${isActive ? 'border-b-2 border-blue-700' : 'hover:border-b-2 hover:border-gray-400'} `}
                            >
                                <p className={`text-sm ${isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                                    {tab.label}
                                </p>
                                <span
                                    className={`px-2 py-0.5 rounded-full text-sm
                                ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}
                                >
                                    {tab.count}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <div className="p-4 flex flex-col gap-5 text-sm text-gray-600 min-h-[150px]">
                    {allRemindersStatus === 'loading' && (
                        <div className="flex flex-col items-center justify-center py-8 w-full">
                            <LoadingIcon />
                            <p>Loading reminders...</p>
                        </div>
                    )}

                    {allRemindersStatus === 'failed' && (
                        <p className="text-red-600 text-center py-8">
                            Error: {allRemindersError || 'Failed to load reminders.'}
                        </p>
                    )}

                    {allRemindersStatus === 'succeeded' && filteredReminders.length === 0 && (
                        <p className="text-center text-gray-500 py-8">No reminders found.</p>
                    )}

                    {allRemindersStatus === 'succeeded' &&
                        filteredReminders.length > 0 &&
                        filteredReminders.map(reminder => (
                            <FollowupInfoCard key={reminder.id} reminder={reminder} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default FollowUpDetail;
