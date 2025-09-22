import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { forgotPassword } from '../../redux/features/auth/authThunk';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSuccess(false);

    if (!email.trim()) {
      return setMessage('Email is required.');
    }

    setLoading(true);
    try {
      const result = await dispatch(forgotPassword({ email })).unwrap();
      setMessage(result.message || 'Reset link sent successfully.');
      setSuccess(true);
    } catch (err: any) {
      setMessage(err || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">

        {/* Left Panel */}
        <div className="hidden md:flex flex-col justify-center items-center bg-green-600 text-white p-8 w-1/2 space-y-4">
          <h2 className="text-3xl font-bold">Forgot Password?</h2>
          <p className="text-center text-sm max-w-sm">
            No worries. Enter your email and we’ll send you a link to reset your password.
          </p>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Reset Your Password</h1>
            <p className="text-sm text-gray-500 mt-1">
              Enter your email address to get the password reset link.
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              {loading ? 'Sending...' : 'Send Reset Link'}
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

export default ForgotPassword;
