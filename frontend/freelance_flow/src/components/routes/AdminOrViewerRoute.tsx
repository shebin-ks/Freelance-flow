import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';

const AdminOrViewerRoute: React.FC = () => {
  const { accessToken, user } = useAppSelector(state => state.auth);

  if (!accessToken) {
    return <Navigate to="/auth" replace />;
  }

  if (user?.role !== 'admin' && user?.role !== 'viewer') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminOrViewerRoute;
