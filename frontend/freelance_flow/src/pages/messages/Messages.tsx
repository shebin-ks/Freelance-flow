import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getMessages } from "../../redux/features/messages/messageThunk";
import { addMessage, updateUserMessage } from "../../redux/features/messages/messageSlice";
import { updateUserDetails } from "../../redux/features/users/usersSlice";
import { groupMessagesByDate } from "../../utils/groupMessagesByDate";
import { getFriendlyDateLabel } from "../../utils/dateFormatter";
import { socket } from "../../socket/socket";
import MessageCard from "./components/MessageCard";
import LastSeen from "./components/LastSeen";
import type { User } from "../../redux/features/commonTypes/commonTypes";
import type { Message } from "../../redux/features/messages/types";
import ChatHeading from "./components/ChatHeading";
import UsersList from "./components/users_list/UsersList";

const Messages = () => {
    const dispatch = useAppDispatch();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { user } = useAppSelector((state) => state.auth);
    const { messages, messagesStatus } = useAppSelector((state) => state.messages);

    const [selectedChat, setSelectedChat] = useState<User | null>(null);
    const [message, setMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {

        if (messagesStatus === "idle") {
            dispatch(getMessages());
        }
    }, [dispatch, messagesStatus]);



    const chatMessages = useMemo(() => {
        if (!selectedChat) return [];
        return messages.filter(
            msg => msg.sender.id === selectedChat.id || msg.receiver.id === selectedChat.id
        );
    }, [messages, selectedChat]);


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);


    useEffect(() => {
        if (selectedChat && user) {
            socket.emit("markAsSeen", { userId: user.id, senderId: selectedChat.id });
            dispatch(updateUserMessage(selectedChat.id));
        }
    }, [selectedChat, user?.id]);


    useEffect(() => {
        const handleUserStatus = (status: { userId: number; isOnline: boolean; lastSeen: string }) => {
            dispatch(updateUserDetails(status));
            if (selectedChat?.id === status.userId) {
                setSelectedChat((prev) => prev && { ...prev, ...status });
            }
        };

        socket.on("userStatus", handleUserStatus);
        return () => {
            socket.off("userStatus", handleUserStatus);
        };
    }, [selectedChat?.id]);


    useEffect(() => {
        const handleMessage = (msg: Message) => {
            if (msg.receiver.id === user?.id && selectedChat?.id === msg.sender.id) {
                msg.messageStatus = "seen";
                socket.emit("updateMessageStatus", { messageId: msg.id, status: "seen" });
            }
            dispatch(addMessage(msg));
        };

        socket.on("message", handleMessage);
        return () => {

            socket.off("message", handleMessage);
        }
    }, [dispatch, selectedChat?.id, user?.id]);


    const handleSend = () => {
        if (!message.trim() || !selectedChat || !user) return;

        socket.emit("sendMessage", {
            toUserId: selectedChat.id,
            fromUserId: user.id,
            content: message.trim(),
        });

        setMessage("");
    };



    return (
        <div className="h-20/24 flex border border-gray-200 my-auto">
            <div
                className={`${selectedChat ? "hidden md:flex" : ""} flex flex-col w-full  md:w-[420px] border-r border-gray-200 p-4 bg-white`}
            >

                <ChatHeading
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <UsersList
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                    searchTerm={searchTerm}
                />

            </div>


            <div className={`${selectedChat ? 'block' : 'hidden md:flex'} w-full flex flex-col bg-gray-50`}>
                {selectedChat ? (
                    <>
                        <div className="p-4 border-b flex gap-2 items-center border-gray-200 font-semibold text-lg bg-white">

                            <ArrowLeft
                                onClick={() => setSelectedChat(null)}
                                className="cursor-pointer"
                            />
                            <div className="flex flex-col font-medium">

                                {selectedChat.name}
                                <LastSeen isOnline={selectedChat.isOnline} lastSeen={selectedChat.lastSeen} />

                            </div>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto space-y-3 ">
                            {Object.entries(groupMessagesByDate(chatMessages)).map(
                                ([dateKey, msgs]) => (
                                    <div key={dateKey} className="space-y-3">
                                        <div className="text-center text-gray-500 text-xs font-medium">
                                            {getFriendlyDateLabel(dateKey)}
                                        </div>
                                        {msgs.map((msg) => (
                                            <MessageCard key={msg.id} message={msg} user={user!} />

                                        ))}
                                    </div>
                                )
                            )}
                            <div ref={messagesEndRef} />

                        </div>

                        <div className="p-4 border-t border-gray-200 flex gap-2 items-center bg-white">
                            <input
                                type="text"
                                className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none"
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            />
                            <button
                                className="bg-blue-500 cursor-pointer text-white rounded-full p-2 hover:bg-blue-600"
                                onClick={handleSend}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-1 flex-col items-center justify-center text-center text-gray-500 px-4">
                        <h2 className="text-2xl font-semibold mb-2">Start Messaging</h2>
                        <p>Select a chat from the left to begin conversation</p>
                    </div>
                )}
            </div>
        </div >
    );
};

export default Messages;
