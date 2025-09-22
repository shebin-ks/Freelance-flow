import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const { accessToken, user, loginStatus } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (location.state?.redirectToLogin) {
      navigate(location.pathname, { replace: true, state: {} });
      setIsLogin(true);
    }

    if (location.state?.successMessage) {
      setShowSuccess(true);
      setSuccessMessage(location.state.successMessage);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  useEffect(() => {
    if (accessToken && user && !location.state?.redirectToLogin) {
      navigate('/');
    }
  }, [loginStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-10">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden transition-all duration-300">

        {/* Left Banner Section */}
        <div className="hidden md:flex flex-col justify-center items-center bg-green-600 text-white p-10 w-1/2 space-y-4">
          <h2 className="text-3xl font-bold">Welcome to FreelanceFlow</h2>
          <p className="text-left text-sm max-w-sm">
            Your all-in-one CRM platform to manage leads, reminders, and communication with ease.
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 space-y-6">
          {showSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-sm text-center">
              {successMessage}
            </div>
          )}

          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {isLogin ? 'Login to FreelanceFlow' : 'Create Your Account'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {isLogin ? 'Welcome back! Please login to continue.' : 'Join FreelanceFlow in just a few steps.'}
            </p>
          </div>

          <div className="animate-fade-in">
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </div>

          <div className="text-sm text-center text-gray-600 pt-2">
            {isLogin ? (
              <>
                Don’t have an account?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-green-600 cursor-pointer font-medium hover:underline"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-green-600 cursor-pointer font-medium hover:underline"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
