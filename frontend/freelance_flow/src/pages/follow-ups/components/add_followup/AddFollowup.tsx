import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { getLeads } from '../../../../redux/features/leads/leadThunk';
import type { Lead } from '../../../../redux/features/commonTypes/commonTypes';
import { saveReminder } from '../../../../redux/features/reminders/reminderThunk';
import type { ReminderPayload } from '../../../../redux/features/reminders/types';

interface AddFollowupProps {
    setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddFollowup: React.FC<AddFollowupProps> = ({ setIsModelOpen }) => {
    const [lead, setLead] = useState('');
    const [type, setType] = useState('call');
    const [note, setNote] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [localMessage, setLocalMessage] = useState<string | null>(null);


    const dispatch = useAppDispatch()

    const { allLeads, allLeadsStatus, } = useAppSelector(state => state.leads)

    const { createError, createStatus } = useAppSelector(state => state.reminders)

    useEffect(() => {
        if (allLeadsStatus === 'idle') {
            dispatch(getLeads())
        }

    }, [dispatch, allLeadsStatus])

    useEffect(() => {
        if (createStatus === 'succeeded') {
            setLocalMessage('Follow-up created successfully!');
            setLead('');
            setType('call');
            setNote('');
            setDueDate('');
            setTimeout(() => {
                setLocalMessage(null);
            }, 4000);
        }

        if (createStatus === 'failed') {
            setLocalMessage(createError || 'Something went wrong!');
            setTimeout(() => {
                setLocalMessage(null);
            }, 4000);
        }
    }, [createStatus]);



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload: ReminderPayload = {
            leadId: parseInt(lead),
            reminderType: type,
            note,
            reminderAt: dueDate,
        };

        console.log('Submitted:', payload);

        dispatch(saveReminder(payload))

    };

    return (
        <div className="bg-white rounded-lg mx-auto w-full max-w-md min-h-[450px]">
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Add New Follow-up</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setIsModelOpen(false)}
                    >
                        <X className="w-5 h-5 cursor-pointer" />
                    </button>
                </div>

                {localMessage && (
                    <div className={`mb-4 p-2 text-sm rounded-md ${createStatus === 'succeeded' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {localMessage}
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="lead" className="block text-sm font-medium text-gray-700">
                        Lead
                    </label>
                    <select
                        id="lead"
                        name="lead"
                        required={true}
                        value={lead}
                        onChange={(e) => setLead(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Lead</option>
                        {allLeads.map((lead: Lead) => (
                            <option key={lead.id} value={lead.id}>
                                {lead.name}  {lead.leadCompanyName ? ` - ${lead.leadCompanyName}` : ''}
                            </option>

                        ))}

                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Type
                    </label>
                    <select
                        id="type"
                        name="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="call">Call</option>
                        <option value="e-mail">E-mail</option>
                        <option value="meeting">Meeting</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                        Note
                    </label>
                    <textarea
                        id="note"
                        name="note"
                        required={true}
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="e.g., Follow up on proposal"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                        Due Date & Time
                    </label>
                    <input
                        id="dueDate"
                        name="dueDate"
                        type="datetime-local"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex space-x-4 pt-4">
                    <button
                        type="submit"
                        className="cursor-pointer flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium"
                    >
                        Add Follow-up
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setLocalMessage(null);
                            setIsModelOpen(false)
                        }
                        }
                        className="cursor-pointer flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddFollowup;
