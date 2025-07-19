import React, { useState } from 'react';
import PageHeader from '../../components/pages/PageHeader';
import Model from '../../components/Model';
import { Users as UsersIcon, UserCheck, UserX, Mail, AlertCircle } from 'lucide-react';
import PageDashboard from '../../components/pages/PageDashboard';
import { useAppSelector } from '../../hooks/reduxHooks';
import UsersDetail from './users_detail/UsersDetail';
import InviteUser from './invite_user/InviteUser';

const Users: React.FC = () => {
  const {
    countAllUsers,
    countActiveUsers,
    countBlockedUsers,
    countRevokedUsers,
    countPendingUsers,
  } = useAppSelector(state => state.users);

  const data = [
    {
      title: 'Total Users',
      value: countAllUsers,
      icon: UsersIcon,
      color: 'text-gray-600',
      bg: 'bg-gray-100',
    },
    {
      title: 'Active',
      value: countActiveUsers,
      icon: UserCheck,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      title: 'Blocked',
      value: countBlockedUsers,
      icon: UserX,
      color: 'text-red-600',
      bg: 'bg-red-100',
    },
    {
      title: 'Revoked',
      value: countRevokedUsers,
      icon: Mail,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      title: 'Pending',
      value: countPendingUsers,
      icon: AlertCircle,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
    },
  ];

  const [isModelOpen, setIsModelOpen] = useState(false);

  return (
    <div className="mx-4 py-6 space-y-8">
      <PageHeader
        setIsModelOpen={setIsModelOpen}
        title="Users"
        subtitle="Manage your team and user invitations"
        btnText="Invite User"
      />
      <PageDashboard data={data} mdCols={5} />
      <UsersDetail />

      <Model isModelOpen={isModelOpen} >
        <InviteUser setIsModelOpen={setIsModelOpen} />
      </Model>
    </div>
  );
};

export default Users;
