import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import LoadingIcon from '../../../components/widgets/LoadingIcon';
import type { Leadpayload } from '../../../redux/features/leads/types';
import { addLead } from '../../../redux/features/leads/leadThunk';
import { resetAddLeadStatus } from '../../../redux/features/leads/leadSlice';

interface AddLeadProps {
    setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddLead: React.FC<AddLeadProps> = ({ setIsModelOpen }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [purpose, setPurpose] = useState('');
    const [localMessage, setLocalMessage] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    const { addLeadError, addLeadStatus } = useAppSelector(state => state.leads);

    useEffect(() => {
        if (addLeadStatus === 'succeeded') {
            setLocalMessage('Lead added successfully!');
            setName('');
            setEmail('');
            setPhone('');
            setCompany('');
            setPurpose('');

            setTimeout(() => {
                dispatch(resetAddLeadStatus())
                setLocalMessage(null);
            }, 2000);
        }

        if (addLeadStatus === 'failed') {
            setLocalMessage(addLeadError || 'Something went wrong!');
            setTimeout(() => setLocalMessage(null), 4000);
        }
    }, [addLeadStatus]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!/^\d{10,15}$/.test(phone)) {
            setLocalMessage('Enter a valid phone number');
            setTimeout(() => {
                setLocalMessage(null);
            }, 2000);
            return;
        }

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setLocalMessage('Enter a valid email');
            setTimeout(() => {
                setLocalMessage(null);
            }, 2000);
            return;
        }

        const payload: Leadpayload = {
            name,
            email,
            phone,
            purpose,
            leadCompanyName: company,
        };

        dispatch(addLead(payload));
    };

    return (
        <div className="bg-white rounded-lg mx-auto w-full max-w-md min-h-[450px] p-6">
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Add New Lead</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setIsModelOpen(false)}
                    >
                        <X className="w-6 h-6 cursor-pointer" />
                    </button>
                </div>

                {localMessage && (
                    <div className={`mb-4 p-2 text-sm rounded-md ${addLeadStatus === 'succeeded' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {localMessage}
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Phone */}
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        id="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g., 9876543210"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Company */}
                <div className="mb-4">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                    <input
                        id="company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g., ABC Pvt Ltd"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Purpose */}
                <div className="mb-4">
                    <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">Purpose</label>
                    <textarea
                        id="purpose"
                        rows={3}
                        required
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="e.g., Interested in web development"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Buttons */}
                <div className="flex space-x-4 pt-4">
                    <button
                        type="submit"
                        disabled={addLeadStatus === 'loading'}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium flex items-center justify-center gap-2"
                    >
                        {addLeadStatus === 'loading' ? (
                            <>
                                <LoadingIcon color='white' />
                                Saving...
                            </>
                        ) : (
                            'Add Lead'
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setLocalMessage(null);
                            setIsModelOpen(false);
                        }}
                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddLead;
