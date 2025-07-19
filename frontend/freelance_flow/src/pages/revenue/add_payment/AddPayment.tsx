import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getLeads } from '../../../redux/features/leads/leadThunk';
import type { Lead } from '../../../redux/features/commonTypes/commonTypes';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import LoadingIcon from '../../../components/widgets/LoadingIcon';
import type { PaymentPayload } from '../../../redux/features/revenue/types';
import { savePayment } from '../../../redux/features/revenue/revenueThunk';

interface AddPaymentProps {
    setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPayment: React.FC<AddPaymentProps> = ({ setIsModelOpen }) => {
    const [lead, setLead] = useState('');
    const [note, setNote] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState(0);
    const [localMessage, setLocalMessage] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    const { allLeads, allLeadsStatus } = useAppSelector(state => state.leads);
    const { addPaymentStatus, addPaymentError } = useAppSelector(state => state.payments);

    useEffect(() => {
        if (allLeadsStatus === 'idle') {
            dispatch(getLeads());
        }
    }, [dispatch, allLeadsStatus]);

    useEffect(() => {
        if (addPaymentStatus === 'succeeded') {
            setLocalMessage('Payment logged successfully!');
            setLead('');
            setNote('');
            setAmount(0);
            setDate('');

            setTimeout(() => setLocalMessage(null), 4000);
        }

        if (addPaymentStatus === 'failed') {
            setLocalMessage(addPaymentError || 'Something went wrong!');
            setTimeout(() => setLocalMessage(null), 4000);
        }
    }, [addPaymentStatus]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload: PaymentPayload = {
            leadId: parseInt(lead),
            note,
            amount,
            createdAt: new Date(date).toISOString(),
        };

        dispatch(savePayment(payload));
    };

    return (
        <div className="bg-white rounded-lg mx-auto w-full max-w-md min-h-[450px]">
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Add Payment</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setIsModelOpen(false)}
                    >
                        <X className="w-5 h-5 cursor-pointer" />
                    </button>
                </div>

                {localMessage && (
                    <div className={`mb-4 p-2 text-sm rounded-md ${addPaymentStatus === 'succeeded' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {localMessage}
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="lead" className="block text-sm font-medium text-gray-700">
                        Lead
                    </label>
                    <select
                        id="lead"
                        required
                        value={lead}
                        onChange={(e) => setLead(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Lead</option>
                        {allLeads.map((lead: Lead) => (
                            <option key={lead.id} value={lead.id}>
                                {lead.name} {lead.leadCompanyName ? `- ${lead.leadCompanyName}` : ''}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                        id="amount"
                        type="number"
                        required
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                        placeholder="e.g., 5000"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="note" className="block text-sm font-medium text-gray-700">Note</label>
                    <textarea
                        id="note"
                        required
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="e.g., Payment received for initial milestone"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Payment Date & Time
                    </label>
                    <input
                        id="date"
                        type="datetime-local"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex space-x-4 pt-4">
                    <button
                        type="submit"
                        disabled={addPaymentStatus === 'loading'}
                        className="cursor-pointer flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium flex items-center justify-center gap-2"
                    >
                        {addPaymentStatus === 'loading' ? (
                            <>
                                <LoadingIcon color='white' />
                                Saving...
                            </>
                        ) : (
                            'Add Payment'
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setLocalMessage(null);
                            setIsModelOpen(false);
                        }}
                        className="cursor-pointer flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPayment;
