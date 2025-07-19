import { useEffect, useState } from "react";
import LoadingIcon from "../../../components/widgets/LoadingIcon";
import LeadInfoCard from "./LeadInfoCard";
import { getLeads, removeLead } from "../../../redux/features/leads/leadThunk";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import Swal from "sweetalert2";
import type { TopLead } from "../../../redux/features/leads/types";
import SearchBar from "../../../components/pages/SearchBar";

const LeadDetail: React.FC = () => {
    const dispatch = useAppDispatch();
    const { allLeads, allLeadsError, allLeadsStatus, deleteLeadStatus, deleteLeadError } = useAppSelector(state => state.leads);

    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLeads = allLeads.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    useEffect(() => {
        if (allLeadsStatus === 'idle') {
            dispatch(getLeads());
        }
    }, [dispatch, allLeadsStatus]);

    useEffect(() => {
        if (deleteLeadStatus === 'succeeded') {
            setMessage('Lead deleted successfully!');
            setMessageType('success');
        } else if (deleteLeadStatus === 'failed') {
            setMessage(deleteLeadError || 'Failed to delete lead!');
            setMessageType('error');
        }

        if (deleteLeadStatus === 'succeeded' || deleteLeadStatus === 'failed') {
            const timeout = setTimeout(() => {
                setMessage(null);
                setMessageType(null);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [deleteLeadStatus, deleteLeadError]);


    return (

        <div className="flex flex-col gap-5">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="border border-gray-100 shadow-md bg-white rounded-md overflow-hidden">
                <div className="flex gap-12 border-b border-gray-200 px-4 py-3">
                    <h1 className='text-black text-xl font-semibold'>Leads</h1>
                </div>
                {message && (
                    <div className={`mx-4 mt-2 p-2 rounded-md text-sm font-medium ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}
                <div className="p-4 flex flex-col gap-5 text-sm text-gray-600 min-h-[150px]">
                    {allLeadsStatus === 'loading' && (
                        <div className="flex flex-col items-center justify-center py-8 w-full">
                            <LoadingIcon />
                            <p>Loading Leads...</p>
                        </div>
                    )}
                    {allLeadsStatus === 'failed' && (
                        <p className="text-red-600 text-center py-8">
                            Error: {allLeadsError || 'Failed to load leads.'}
                        </p>
                    )}
                    {allLeadsStatus === 'succeeded' && allLeads.length === 0 && (
                        <p className="text-center text-gray-500 py-8">No Leads found.</p>
                    )}
                    <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                        {allLeadsStatus === 'succeeded' &&
                            filteredLeads.map((lead: TopLead) => (
                                <LeadInfoCard
                                    key={lead.id}
                                    lead={lead}
                                    onDelete={() => {
                                        Swal.fire({
                                            title: 'Delete Lead?',
                                            text: `Are you sure you want delete ${lead.name} ?`,
                                            icon: 'question',
                                            showCancelButton: true,
                                            confirmButtonColor: '#2563eb',
                                            cancelButtonColor: '#6b7280',
                                            confirmButtonText: 'Yes, delete it!',
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                dispatch(removeLead(lead.id));
                                            }
                                        });
                                    }}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};


export default LeadDetail