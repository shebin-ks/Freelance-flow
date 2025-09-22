import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { getCompanyUsers } from "../../../../redux/features/users/usersThunk";
import { getMessages } from "../../../../redux/features/messages/messageThunk";
import UserCard from "./UserCard";
import type { User } from "../../../../redux/features/commonTypes/commonTypes";

type Props = {
    selectedChat: User | null
    setSelectedChat: React.Dispatch<React.SetStateAction<User | null>>;
    searchTerm: string;

}

const UsersList = ({ searchTerm, selectedChat, setSelectedChat }: Props) => {



    const { users, fetchUsersStatus } = useAppSelector((state) => state.users);

    const { user } = useAppSelector(state => state.auth)
    const { messages, messagesStatus } = useAppSelector((state) => state.messages);

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (fetchUsersStatus === "idle") {
            dispatch(getCompanyUsers());
        }

        if (messagesStatus === "idle") {
            dispatch(getMessages());
        }
    }, [fetchUsersStatus, messagesStatus])



    const unseenCounts = useMemo(() => {
        const counts: Record<number, number> = {};
        messages.forEach(msg => {
            if (msg.receiver.id === user?.id && msg.messageStatus !== "seen") {
                counts[msg.sender.id] = (counts[msg.sender.id] || 0) + 1;
            }
        });
        return counts;
    }, [messages, user?.id]);


    const sortedUsers = useMemo(() => {
        return users
            .filter((u) => u.id !== user?.id && u.status === 'active' && u.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((u) => {
                const relatedMsgs = messages.filter(
                    (msg) => msg.sender.id === u.id || msg.receiver.id === u.id
                );
                const last = relatedMsgs.sort((a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                )[0];
                return { ...u, lastMessageTime: last ? new Date(last.createdAt).getTime() : 0 };
            })
            .sort((a, b) => b.lastMessageTime - a.lastMessageTime);
    }, [users, messages, searchTerm, user?.id]);

    return (
        <div className="overflow-y-auto hide-scrollbar">

            <ul className="space-y-1 flex-1 overflow-y-auto">

                {sortedUsers.length === 0 ? (
                    <div className="text-center text-sm text-gray-500 py-8">
                        No users found.
                    </div>
                ) : (
                    <ul className="space-y-1 flex-1 overflow-y-auto">
                        {sortedUsers.map((user) => (
                            <UserCard
                                key={user.id}
                                user={user}
                                setSelectedChat={setSelectedChat}
                                selectedChat={selectedChat}
                                unSeenCount={unseenCounts[user.id]}
                            />
                        ))}
                    </ul>
                )}

            </ul>
        </div>
    )
}


export default UsersList