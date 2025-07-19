import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import type { InvitationPayload } from '../../../redux/features/users/types';
import { addUser } from '../../../redux/features/users/usersThunk';
import LoadingIcon from '../../../components/widgets/LoadingIcon';

interface InviteUserProps {
    setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InviteUser: React.FC<InviteUserProps> = ({ setIsModelOpen }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [localMessage, setLocalMessage] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    const { inviteUserStatus, inviteUserError } = useAppSelector(state => state.users);

    useEffect(() => {
        if (inviteUserStatus === 'succeeded') {
            setLocalMessage('Invitation sent!');
            setEmail('');
            setName('');
            setRole('');
            setTimeout(() => setLocalMessage(null), 4000);
        }

        if (inviteUserStatus === 'failed') {
            setLocalMessage(inviteUserError || 'Something went wrong!');
            setTimeout(() => setLocalMessage(null), 4000);
        }
    }, [inviteUserStatus, inviteUserError]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !name || !role) {
            setLocalMessage('Please fill all fields');
            setTimeout(() => setLocalMessage(null), 3000);
            return;
        }

        const payload: InvitationPayload = { email, name, role };
        dispatch(addUser(payload));
    };

    return (
        <div className="bg-white rounded-lg mx-auto w-full max-w-md min-h-[350px] p-6">
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Invite User</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setIsModelOpen(false)}
                    >
                        <X className="w-5 h-5 cursor-pointer" />
                    </button>
                </div>

                {localMessage && (
                    <div
                        className={`mb-4 p-2 text-sm rounded-md text-center ${inviteUserStatus === 'succeeded'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                            }`}
                    >
                        {localMessage}
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g., user@example.com"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="User's full name"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                        id="role"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="assistant">Assistant</option>
                        <option value="viewer">Viewer</option>
                    </select>
                </div>

                <div className="flex space-x-4 pt-4">
                    <button
                        type="submit"
                        disabled={inviteUserStatus === 'loading'}
                        className="flex-1 flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium"
                    >
                        {inviteUserStatus === 'loading' ? (
                            <>
                                <LoadingIcon color="white" /> Sending...
                            </>
                        ) : (
                            'Send Invite'
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsModelOpen(false)}
                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InviteUser;
