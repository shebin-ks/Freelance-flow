import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './pages/MainLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Leads from './pages/leads/Leads';
import FollowUps from './pages/follow-ups/FollowUps';
import Pipeline from './pages/pipeline/Pipeline';
import Communications from './pages/communications/Communications';
import Revenue from './pages/revenue/Revenue';
import AuthScreen from './pages/authentication/AuthScreen';
import ProtectedRoute from './components/routes/ProtectedRoute';
import AdminOrViewerRoute from './components/routes/AdminOrViewerRoute';
import UserList from './pages/users/Users';
import AcceptInvite from './pages/users/invite_user/AcceptInvite';
import ForgotPassword from './pages/authentication/ForgotPassword';
import ResetPassword from './pages/authentication/ResetPassword';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="leads" element={<Leads />} />
            <Route path="followups" element={<FollowUps />} />
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="communications" element={<Communications />} />
            <Route element={<AdminOrViewerRoute />}>
              <Route path="revenue" element={<Revenue />} />
              <Route path="users" element={<UserList />} />

            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="/accept-invite/:token" element={<AcceptInvite />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
