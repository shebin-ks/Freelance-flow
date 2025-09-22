import { format, isToday, isYesterday } from 'date-fns';

type Props = {
    isOnline: boolean;
    lastSeen: string;
};

function LastSeen({ isOnline, lastSeen }: Props) {
    const lastSeenDate = new Date(lastSeen);

    if (isOnline) {
        return <div className="text-xs text-green-600 font-medium">Online</div>;
    }

    let lastSeenText = '';

    if (isToday(lastSeenDate)) {
        lastSeenText = `last seen today at ${format(lastSeenDate, 'h:mm a')}`;
    } else if (isYesterday(lastSeenDate)) {
        lastSeenText = `last seen yesterday at ${format(lastSeenDate, 'h:mm a')}`;
    } else {
        lastSeenText = `last seen on ${format(lastSeenDate, 'MMM d')} at ${format(lastSeenDate, 'h:mm a')}`;
    }

    return <div className="text-xs text-gray-500">{lastSeenText}</div>;
}

export default LastSeen;
