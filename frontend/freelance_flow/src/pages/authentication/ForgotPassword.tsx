import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { forgotPassword } from '../../redux/features/auth/authThunk';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Forgot Password</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email to receive a password reset link.
        </p>
        {message && (
          <p
            className={`mb-4 text-center text-sm font-medium ${success ? 'text-green-600' : 'text-red-600'
              }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none mb-4"
            disabled={loading}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>


      </div>
    </div>
  );
};

export default ForgotPassword;
