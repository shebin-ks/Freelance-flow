import React from 'react';
import { Trash2 } from 'lucide-react';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { removeUser, changeUserStatus } from '../../../redux/features/users/usersThunk';
import type { UserStatusPayload } from '../../../redux/features/users/types';
import Swal from 'sweetalert2';

interface User {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    role: string;
    status: string;
}

interface UserInfoCardProps {
    user: User;
}

const allStatusOptions = ['active', 'blocked', 'pending', 'revoked'];

const UserInfoCard: React.FC<UserInfoCardProps> = ({ user }) => {
    const dispatch = useAppDispatch();

    // Filter available status options based on current user status,
    // but always include the current status so it shows as selected option.
    const availableOptions = allStatusOptions.filter(status => {
        if (user.status === 'active') {
            return status !== 'pending' && status !== 'revoked';
        }
        if (user.status === 'pending') {
            return status === 'revoked' || status === 'pending';
        }
        if (user.status === 'revoked') {
            return status === 'revoked';
        }
        if (user.status === 'blocked') {
            return status !== 'pending' && status !== 'revoked';
        }
        return true;
    });

    if (!availableOptions.includes(user.status)) {
        availableOptions.push(user.status);
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;

        if (newStatus === user.status) return; // no change, no action

        Swal.fire({
            title: 'Change User Status?',
            text: `Are you sure you want to change the status of ${user.name} from ${user.status} to ${newStatus}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, change it!',
            cancelButtonText: 'Cancel',
        }).then(result => {
            if (result.isConfirmed) {
                const payload: UserStatusPayload = {
                    userId: user.id,
                    status: newStatus,
                };
                dispatch(changeUserStatus(payload));
            }
        });
    };

    const handleDelete = () => {
        Swal.fire({
            title: 'Delete User?',
            text: `Are you sure you want to delete ${user.name}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Delete it!',
            cancelButtonText: 'Cancel',
        }).then(result => {
            if (result.isConfirmed) {
                dispatch(removeUser(user.id));
            }
        });
    };

    return (
        <div className="flex p-4 justify-between rounded-md border bg-white border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex flex-col gap-1">
                <p className="font-semibold text-lg">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600 capitalize">Role: {user.role}</p>
                <p className="text-sm text-gray-600 capitalize">Status: {user.status}</p>
                {user.phone && <p className="text-sm text-gray-600">Phone: {user.phone}</p>}
            </div>

            <div className="flex items-center gap-4">
                <select
                    value={user.status}
                    onChange={handleStatusChange}
                    className="border rounded px-2 py-1 text-sm cursor-pointer"
                    title="Change user status"
                >
                    {availableOptions.map(status => (
                        <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                    ))}
                </select>

                <Trash2
                    className="w-5 h-5 cursor-pointer text-red-600 hover:text-red-800"
                    onClick={handleDelete}
                />
            </div>
        </div>
    );
};

export default UserInfoCard;
