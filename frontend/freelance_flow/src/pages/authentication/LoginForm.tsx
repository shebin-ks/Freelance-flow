import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { login } from '../../redux/features/auth/authThunk';
import type { LoginPayload } from '../../redux/features/auth/types';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loginStatus, loginError } = useAppSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: LoginPayload = {
      email,
      password,
    };
    dispatch(login(payload));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-md mx-auto bg-white p-6 rounded shadow-md"
    >
      {loginStatus === 'loading' && (
        <div className="text-blue-600 font-medium text-center">Logging in...</div>
      )}

      {loginError && (
        <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded-md text-sm">
          {loginError}
        </div>
      )}

      <div>
        <label className="block text-sm text-gray-600 mb-1">Email</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Password</label>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
        <div className="text-right mt-1">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={loginStatus === 'loading'}
        className={`cursor-pointer w-full bg-blue-600 text-white font-medium py-2 rounded-lg transition ${loginStatus === 'loading'
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-blue-700'
          }`}
      >
        {loginStatus === 'loading' ? 'Please wait...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
