import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { resetPassword } from '../../redux/features/auth/authThunk';
import type { InvitationAcceptPayload } from '../../redux/features/users/types';

const ResetPassword: React.FC = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setSuccess(false);

        if (password !== confirm) {
            setMessage('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            const payload: InvitationAcceptPayload = {
                token: token!,
                password,
            };
            const result = await dispatch(resetPassword(payload)).unwrap();
            setMessage(result.message || 'Password reset successful.');
            setSuccess(true);
            localStorage.clear();

            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            setMessage(err || 'Reset failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Reset Your Password</h2>
                {message && (
                    <p
                        className={`mt-4 text-center text-sm font-medium ${success ? 'text-green-600' : 'text-red-600'
                            }`}
                    >
                        {message}
                    </p>
                )}
                <form onSubmit={handleReset}>
                    <input
                        type="password"
                        placeholder="New Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        required
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>


            </div>
        </div>
    );
};

export default ResetPassword;
