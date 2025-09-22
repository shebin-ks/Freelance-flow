import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { login } from '../../redux/features/auth/authThunk';
import type { LoginPayload } from '../../redux/features/auth/types';
import { Link } from 'react-router-dom';
import PasswordField from './components/PasswordField';
import InputField from './components/InputField';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loginStatus, loginError } = useAppSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: LoginPayload = { email, password };
    dispatch(login(payload));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Loading status */}
      {loginStatus === 'loading' && (
        <div className="text-green-600 font-medium text-center text-sm">
          Logging in...
        </div>
      )}

      {/* Error Message */}
      {loginError && (
        <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded-md text-sm text-center">
          {loginError}
        </div>
      )}

      {/* Email Field */}
      <InputField
        id="email"
        label="Email"
        type="email"
        value={email}
        placeholder="you@example.com"
        required
        onChange={(e) => setEmail(e.target.value)}
      />


      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>

        <PasswordField
          password={password}
          setPassword={setPassword}
        />

      </div>

      <div className="text-right mt-2">
        <Link
          to="/forgot-password"
          className="text-sm text-green-600 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>


      {/* Submit Button */}
      <button
        type="submit"
        disabled={loginStatus === 'loading'}
        className={`w-full py-3 cursor-pointer font-semibold rounded-xl text-white transition ${loginStatus === 'loading'
          ? 'bg-green-400 cursor-not-allowed'
          : 'bg-green-600 hover:bg-green-700'
          }`}
      >
        {loginStatus === 'loading' ? 'Please wait...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
