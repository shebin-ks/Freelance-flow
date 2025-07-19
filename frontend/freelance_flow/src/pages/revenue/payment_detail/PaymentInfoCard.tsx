import { Building, Calendar, CreditCard, UserIcon } from 'lucide-react';
import React from 'react';
import {  format } from 'date-fns';
import type { Payment } from '../../../redux/features/revenue/types';

const PaymentInfoCard: React.FC<{ payment: Payment }> = ({ payment }) => {
    const createdDate = new Date(payment.createdAt);
    const formattedDateTime = format(createdDate, 'PPPp');



    return (
        <div className="flex p-4 justify-between rounded-md border bg-white border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex gap-4">
                <div className="p-2 h-min bg-green-100 rounded-lg">
                    <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex flex-col gap-2 text-[1rem] text-black">
                    <div className="flex items-center gap-3">
                        <span className="font-medium">{payment.note || 'No note added'}</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <p className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
                            <UserIcon className="w-4 h-4" /> {payment.lead?.name || 'N/A'}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Building className="w-4 h-4" />
                            <span >{payment.lead?.leadCompanyName || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{formattedDateTime}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center font-semibold text-lg text-black">
                $ {payment.amount}
            </div>
        </div>
    );
};

export default PaymentInfoCard;
