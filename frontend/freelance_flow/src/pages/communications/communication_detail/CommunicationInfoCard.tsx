import { AlertCircle, Calendar } from 'lucide-react';
import React from 'react';
import CommunicationTypeIcon from '../../../components/widgets/communicationTypeIcon';
import CommunicationType from '../../../components/widgets/CommunicationType';
import type { Communication } from '../../../redux/features/communications/types';
import { differenceInDays, format } from 'date-fns';

const CommunicationInfoCard: React.FC<{ communication: Communication }> = ({ communication }) => {
    const createdDate = new Date(communication.createdAt);
    const formattedDateTime = format(createdDate, 'PPPp');
    const daysAgo = differenceInDays(new Date(), createdDate);

    return (
        <div className="flex p-4 justify-between rounded-md border bg-white border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex gap-4">
                <CommunicationTypeIcon type={communication.communicationType} />
                <div className="flex flex-col gap-2 text-[1rem] text-black">
                    <div className="flex items-center gap-3">
                        <span className="font-medium">{communication.note || 'No note added'}</span>
                        <CommunicationType communicationType={communication.communicationType} />
                        {communication.followUpNeeded && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Follow-up needed
                            </span>)}
                    </div>

                    <p className="text-sm font-medium text-gray-600">
                        Contact: {communication.lead?.name || 'N/A'}
                    </p>
                    {communication.note && (
                        <div>
                            <span className="text-sm font-medium text-gray-700">Note:</span>
                            <p className="text-sm text-gray-600 mt-1">{communication.note}</p>
                        </div>
                    )}
                    {communication.outcome && (
                        <div>
                            <span className="text-sm font-medium text-gray-700">Outcome:</span>
                            <p className="text-sm text-gray-600 mt-1">{communication.outcome}</p>
                        </div>
                    )}

                    {communication.outcome && (
                        <div>
                            <span className="text-sm font-medium text-gray-700">Outcome:</span>
                            <p className="text-sm text-gray-600 mt-1">{communication.outcome}</p>
                        </div>
                    )}
                    {communication.followUpNeeded && (
                        <div>
                            <span className="text-sm font-medium text-gray-700">Follow-up Needed:</span>
                            <p className="text-sm text-gray-600 mt-1">{communication.followUpNeeded}</p>
                        </div>
                    )}


                    <div className="flex mt-3 items-center text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <p className="text-sm ml-2">
                            {formattedDateTime}
                            <span className="ml-2 text-xs text-gray-500">
                                · {daysAgo === 0 ? 'Today' : `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default CommunicationInfoCard;
