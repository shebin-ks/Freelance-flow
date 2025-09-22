import type React from 'react';
import type { User } from '../../../../redux/features/commonTypes/commonTypes'
import LastSeen from '../LastSeen'

type Props = {
    user: User;
    unSeenCount: number | null;
    selectedChat: User | null;
    setSelectedChat: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserCard = ({ user, unSeenCount, selectedChat, setSelectedChat }: Props) => {
    return (
        <li key={user.id} onClick={() => setSelectedChat(user)} className="p-1">
            <div className="border-b pb-2 border-gray-200">
                <div
                    className={`flex items-center justify-between gap-3 p-3 rounded-xl cursor-pointer transition-colors duration-200 ${selectedChat?.id === user.id ? "bg-blue-100" : "hover:bg-gray-100"
                        }`}
                >
                    <div className="flex gap-3 items-center">
                        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-sm font-medium text-gray-800 truncate">
                            {user.name}
                            <LastSeen isOnline={user.isOnline} lastSeen={user.lastSeen} />
                        </div>
                    </div>

                    {unSeenCount && (
                        <div className="bg-red-500 text-white px-2 rounded-full text-sm py-0.5">
                            {unSeenCount}
                        </div>
                    )}
                </div>
            </div>
        </li>
    )
}

export default UserCard