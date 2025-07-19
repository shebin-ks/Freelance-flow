import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import LoadingIcon from '../../../components/widgets/LoadingIcon';
import PaymentInfoCard from './PaymentInfoCard';
import { getPayments } from '../../../redux/features/revenue/revenueThunk';
import type { Payment } from '../../../redux/features/revenue/types';
import SearchBar from '../../../components/pages/SearchBar';

const PaymentDetail: React.FC = () => {

    const dispatch = useAppDispatch();

    const { payments, paymentsStatus, paymentsError } = useAppSelector(state => state.payments)
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (paymentsStatus === 'idle') {
            dispatch(getPayments());
        }
    }, [dispatch, paymentsStatus]);


    const filteredPayments = payments.filter(payment =>
        payment.lead.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="flex flex-col gap-5">
            <SearchBar 
            searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="border border-gray-100 shadow-md bg-white rounded-md overflow-hidden">
                <div className="flex gap-12 border-b border-gray-200 px-4 py-3">
                    <h1 className='text-black text-xl font-semibold'>Revenue Records</h1>
                </div>

                <div className="p-4 flex flex-col gap-5 text-sm text-gray-600 min-h-[150px]">
                    {paymentsStatus === 'loading' && (
                        <div className="flex flex-col items-center justify-center py-8 w-full">
                            <LoadingIcon />
                            <p>Loading Payments...</p>
                        </div>
                    )}

                    {paymentsStatus === 'failed' && (
                        <p className="text-red-600 text-center py-8">
                            Error: {paymentsError || 'Failed to load communications.'}
                        </p>
                    )}

                    {paymentsStatus === 'succeeded' && payments.length === 0 && (
                        <p className="text-center text-gray-500 py-8">No Payments found.</p>
                    )}

                    {paymentsStatus === 'succeeded' &&
                        filteredPayments.map((payment: Payment) => (
                            <PaymentInfoCard key={payment.id} payment={payment} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default PaymentDetail;
