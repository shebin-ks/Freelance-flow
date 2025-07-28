import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import type { Communication } from '../../../redux/features/communications/types';
import CommunicationInfoCard from './CommunicationInfoCard';
import { getCompanyCommunications } from '../../../redux/features/communications/communicationThunk';
import LoadingIcon from '../../../components/widgets/LoadingIcon';
import SearchBar from '../../../components/pages/SearchBar';

const CommunicationDetail: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState('');

    const dispatch = useAppDispatch();
    const {
        communications,
        fetchStatus,
        fetchError,
        countAll,
        countFollowupNeeded,
        countCall,
        countEmail,
        countMeeting,
    } = useAppSelector(state => state.communication);

    const tabs = [
        { label: 'All', count: countAll },
        { label: 'Call', count: countCall },
        { label: 'E-mail', count: countEmail },
        { label: 'Meeting', count: countMeeting },
        { label: 'Follow-ups', count: countFollowupNeeded },
    ];

    useEffect(() => {
        if (fetchStatus === 'idle') {
            dispatch(getCompanyCommunications());
        }
    }, [dispatch, fetchStatus]);

    const filtered = communications.filter((comm: Communication) => {
        const matchesSearch =
            comm.lead?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            comm.note?.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        if (activeTab === 'All') return true;
        if (activeTab === 'Follow-ups') return comm.followUpNeeded !== null;
        return comm.communicationType === activeTab.toLowerCase();
    });

    return (
        <div className="flex flex-col gap-5">
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder='Search by name, or notes...'
            />

            <div className="border   border-gray-100 shadow-md bg-white rounded-md overflow-hidden">


                <div className="flex gap-12 border-b border-gray-200 px-4 py-3 overflow-auto">
                    {tabs.map((tab, index) => {
                        const isActive = tab.label === activeTab;
                        return (
                            <div
                                key={index}
                                onClick={() => setActiveTab(tab.label)}
                                className={`flex items-center gap-2 cursor-pointer pb-2
                                ${isActive ? 'border-b-2 border-blue-700' : 'hover:border-b-2 hover:border-gray-400'}`}
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
                    {fetchStatus === 'loading' && (
                        <div className="flex flex-col items-center justify-center py-8 w-full">
                            <LoadingIcon />
                            <p>Loading communications...</p>
                        </div>
                    )}

                    {fetchStatus === 'failed' && (
                        <p className="text-red-600 text-center py-8">
                            Error: {fetchError || 'Failed to load communications.'}
                        </p>
                    )}

                    {fetchStatus === 'succeeded' && filtered.length === 0 && (
                        <p className="text-center text-gray-500 py-8">No communications found.</p>
                    )}

                    {fetchStatus === 'succeeded' &&
                        filtered.map((comm: Communication) => (
                            <CommunicationInfoCard key={comm.id} communication={comm} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default CommunicationDetail;
