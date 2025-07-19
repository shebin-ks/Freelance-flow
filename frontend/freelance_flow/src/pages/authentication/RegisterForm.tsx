import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import type { RegisterPayload } from '../../redux/features/auth/types';
import { register } from '../../redux/features/auth/authThunk';

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
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

      {registerStatus === 'loading' && (
        <div className="text-blue-600 text-sm text-center">Registering...</div>
      )}

      {registerError && (
        <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded-md text-sm">
          {registerError}
        </div>
      )}

      <div>
        <label className="block text-sm text-gray-600 mb-1">Full Name</label>
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Company Name</label>
        <input
          type="text"
          value={company}
          required
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

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
      </div>

      <button
        type="submit"
        disabled={registerStatus === 'loading'}
        className={`cursor-pointer w-full bg-green-600 text-white font-medium py-2 rounded-lg transition ${registerStatus === 'loading' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
          }`}
      >
        {registerStatus === 'loading' ? 'Please wait...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;
