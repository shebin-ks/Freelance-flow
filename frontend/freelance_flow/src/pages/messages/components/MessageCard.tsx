import { Check, CheckCheck } from 'lucide-react';
import type { User } from '../../../redux/features/commonTypes/commonTypes';
import type { Message } from '../../../redux/features/messages/types';
import { format } from 'date-fns';

type Props = {
    message: Message;
    user: User;
};

function MessageCard({ message, user }: Props) {
    const isOwnMessage = message.sender.id === user.id;

    const renderTicks = () => {
        if (!isOwnMessage) return null;

        switch (message.messageStatus) {
            case 'sent':
                return <Check className="w-4 h-4 text-gray-500" />;
            case 'delivered':
                return <CheckCheck className="w-4 h-4 text-gray-500" />;
            case 'seen':
                return <CheckCheck className="w-4 h-4 text-blue-500" />;
            default:
                return null;
        }
    };

    return (
        <div
            className={`max-w-sm px-4 py-2 w-3/4 rounded-xl ${isOwnMessage
                    ? 'bg-white border border-gray-200 text-gray-900 self-end ml-auto'
                    : 'bg-blue-100 border border-gray-200 text-gray-900'
                }`}
        >
            <p>{message.content}</p>
            <div className="flex justify-between items-center mt-1">
                <span
                    className={`text-xs ${isOwnMessage ? 'text-gray-600' : 'text-gray-500'
                        }`}
                >
                    {format(new Date(message.createdAt), 'h:mm a')}
                </span>
                {renderTicks()}
            </div>
        </div>
    );
}

export default MessageCard;
