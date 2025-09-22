import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import type { RegisterPayload } from '../../redux/features/auth/types';
import { register } from '../../redux/features/auth/authThunk';
import PasswordField from './components/PasswordField';
import InputField from './components/InputField';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { registerStatus, registerError } = useAppSelector(state => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: RegisterPayload = {
      email,
      password,
      name,
      companyName: company
    };
    dispatch(register(payload));
  };

  useEffect(() => {
    if (registerStatus === 'succeeded') {
      navigate('/auth', {
        state: {
          redirectToLogin: true,
          successMessage: 'Registration successful! Please login.',
        },
      });
    }
  }, [registerStatus]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {registerStatus === 'loading' && (
        <div className="text-blue-600 text-sm text-center">Registering...</div>
      )}

      {registerError && (
        <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded-md text-sm text-center">
          {registerError}
        </div>
      )}

      <InputField
        id="name"
        label="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Shebin"
        required
      />

      <InputField
        id="company"
        label="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Abc Pvt Ltd."
        required
      />

      <InputField
        id="email"
        type="email"
        label="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
      />

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <PasswordField
          password={password}
          setPassword={setPassword}
        />

      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={registerStatus === 'loading'}
        className={`w-full py-3 cursor-pointer font-semibold rounded-xl text-white transition ${registerStatus === 'loading'
          ? 'bg-green-400 cursor-not-allowed'
          : 'bg-green-600 hover:bg-green-700'
          }`}
      >
        {registerStatus === 'loading' ? 'Please wait...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;
