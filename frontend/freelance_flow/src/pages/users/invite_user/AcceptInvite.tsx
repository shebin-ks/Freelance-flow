import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import LoadingIcon from '../../../components/widgets/LoadingIcon';
import { acceptInvite } from '../../../redux/features/users/usersThunk';
import type { InvitationAcceptPayload } from '../../../redux/features/users/types';

const AcceptInvite: React.FC = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { inviteAcceptStatus, inviteAcceptError } = useAppSelector(state => state.users);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [localMessage, setLocalMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'error' | 'success' | null>(null);

    useEffect(() => {
        if (inviteAcceptStatus === 'succeeded') {
            setMessageType('success');
            setLocalMessage('Invitation accepted successfully! Redirecting to login...');

            const timer = setTimeout(() => {
                setLocalMessage(null);
                navigate('/auth', {
                    replace: false,
                    state: {
                        redirectToLogin: true,
                        successMessage: 'Invite accepted successfully. You can now login.',
                    }
                });

            }, 3000);

            return () => clearTimeout(timer);
        }

        if (inviteAcceptStatus === 'failed') {
            setMessageType('error');
            setLocalMessage(inviteAcceptError || 'Something went wrong!');
            const timer = setTimeout(() => setLocalMessage(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [inviteAcceptStatus]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            setMessageType('error');
            setLocalMessage('Please fill all fields');
            return;
        }

        if (password !== confirmPassword) {
            setMessageType('error');
            setLocalMessage('Passwords do not match');
            return;
        }

        if (!token) {
            setMessageType('error');
            setLocalMessage('Invalid or missing invitation token');
            return;
        }

        const payload: InvitationAcceptPayload = { token, password };
        dispatch(acceptInvite(payload));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-6">
                <h1 className="text-2xl font-bold text-center text-gray-800">Accept Invitation</h1>

                {localMessage && (
                    <div
                        className={`px-4 py-2 text-sm rounded text-center ${messageType === 'success'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                    >
                        {localMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={inviteAcceptStatus === 'loading'}
                        className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium flex justify-center items-center gap-2"
                    >
                        {inviteAcceptStatus === 'loading' ? (
                            <>
                                <LoadingIcon color="white" />
                                Submitting...
                            </>
                        ) : (
                            'Accept Invitation'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AcceptInvite;
