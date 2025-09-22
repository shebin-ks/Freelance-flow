import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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

            setTimeout(() => navigate('/auth'), 2000);
        } catch (err: any) {
            setMessage(err || 'Reset failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">

                {/* Left Panel */}
                <div className="hidden md:flex flex-col justify-center items-center bg-green-600 text-white p-8 w-1/2 space-y-4">
                    <h2 className="text-3xl font-bold">Reset Password</h2>
                    <p className="text-center text-sm max-w-sm">
                        Enter your new password to regain access to your account quickly and securely.
                    </p>
                </div>

                {/* Right Panel */}
                <div className="w-full md:w-1/2 p-8 space-y-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800">Set New Password</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Please enter and confirm your new password below.
                        </p>
                    </div>

                    {message && (
                        <div
                            className={`text-sm font-medium text-center px-4 py-2 rounded-md ${success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}
                        >
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleReset} className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="New password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                disabled={loading}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                id="confirm"
                                type="password"
                                placeholder="Confirm new password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                disabled={loading}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full cursor-pointer py-2.5 font-semibold rounded-xl text-white transition ${loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                                }`}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>

                        <div className="text-sm text-center mt-2 text-gray-600">
                            <Link to="/auth" className="text-green-600 hover:underline">
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
