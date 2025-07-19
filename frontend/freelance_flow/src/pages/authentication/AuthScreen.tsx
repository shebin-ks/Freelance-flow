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


  const { accessToken, user,loginStatus } = useAppSelector(state => state.auth)


  useEffect(() => {
    if (location.state?.redirectToLogin) {
      navigate(location.pathname, { replace: true, state: {} });

      setIsLogin(true);
    }

    if (location.state?.successMessage) {
      setShowSuccess(true);
      setSuccessMessage(location.state.successMessage)


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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-6">
        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-sm text-center">
            {successMessage}
          </div>
        )}

        <h1 className="text-2xl font-bold text-center text-gray-800">
          {isLogin ? 'Login to FreelanceFlow' : 'Create Your Account'}
        </h1>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <div className="text-sm text-center text-gray-600">
          {isLogin ? (
            <>
              Don’t have an account?{' '}
              <button onClick={() => setIsLogin(false)} className="text-blue-600 cursor-pointer hover:text-blue-800">
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={() => setIsLogin(true)} className="text-blue-600 cursor-pointer hover:text-blue-800">
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
