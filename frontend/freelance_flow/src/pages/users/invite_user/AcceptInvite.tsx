import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import LoadingIcon from '../../../components/widgets/LoadingIcon';
import { acceptInvite } from '../../../redux/features/users/usersThunk';
import type { InvitationAcceptPayload } from '../../../redux/features/users/types';
import PasswordField from '../../authentication/components/PasswordField';

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
    }, [inviteAcceptStatus, inviteAcceptError, navigate]);

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
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">

                {/* Left Panel */}
                <div className="hidden md:flex flex-col justify-center items-center bg-green-600 text-white p-8 w-1/2 space-y-4">
                    <h2 className="text-3xl font-bold">Accept Your Invitation</h2>
                    <p className="text-center text-sm max-w-sm">
                        Set your password to complete the account setup and start using FreelanceFlow.
                    </p>
                </div>

                {/* Right Panel */}
                <div className="w-full md:w-1/2 p-8 space-y-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800">Set Password</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Enter and confirm your new password below to accept the invitation.
                        </p>
                    </div>

                    {localMessage && (
                        <div
                            className={`text-sm font-medium text-center px-4 py-2 rounded-md ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                        >
                            {localMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <PasswordField
                                password={password}
                                setPassword={setPassword}
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder='Confirm Password'
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                disabled={inviteAcceptStatus === 'loading'}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={inviteAcceptStatus === 'loading'}
                            className={`w-full cursor-pointer py-2.5 font-semibold rounded-xl text-white transition ${inviteAcceptStatus === 'loading' ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                        >
                            {inviteAcceptStatus === 'loading' ? (
                                <div className="flex justify-center items-center gap-2">
                                    <LoadingIcon color="white" />
                                    Submitting...
                                </div>
                            ) : (
                                'Accept Invitation'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AcceptInvite;
