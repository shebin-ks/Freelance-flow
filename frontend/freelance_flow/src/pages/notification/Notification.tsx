import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { markAllAsSeen } from "../../redux/features/notification/notificationSlice";

type Props = {};

const Notification = ({ }: Props) => {
    const dispatch = useAppDispatch();
    const { notifications } = useAppSelector((state) => state.notification);

    useEffect(() => {
        const hasUnseen = notifications.some((n) => !n.seen);

        if (hasUnseen) {
            const updated = notifications.map((n) => ({ ...n, seen: true }));
            localStorage.setItem("notifications", JSON.stringify(updated));
            dispatch(markAllAsSeen());
        }
    }, [notifications]);


    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                Notifications
            </h2>

            {notifications.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                    No notifications yet.
                </div>
            ) : (
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
                    {notifications.map((n) => (
                        <div
                            key={n.id}
                            className={`rounded-xl shadow-sm p-4 border transition-all cursor-pointer hover:shadow-md ${n.seen
                                ? "bg-white border-gray-200 hover:bg-gray-50"
                                : "bg-blue-50 border-blue-300"
                                }`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-sm text-blue-700">
                                    {n.type}
                                </span>
                                {!n.seen && (
                                    <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                                        New
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-800 text-sm">{n.message}</p>
                            <p className="text-xs text-gray-500 mt-2">
                                {new Date(n.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notification;
