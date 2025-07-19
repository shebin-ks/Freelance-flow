import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import LoadingIcon from '../../../components/widgets/LoadingIcon';
import { getCompanyUsers } from '../../../redux/features/users/usersThunk';
import type { User } from '../../../redux/features/commonTypes/commonTypes';
import UsersInfoCard from './UsersInfoCard';

const UsersDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const dispatch = useAppDispatch();

  const {
    users,
    fetchUsersStatus,
    fetchUsersError,
    countAllUsers,
    countActiveUsers,
    countBlockedUsers,
    countRevokedUsers,
    countPendingUsers,
  } = useAppSelector(state => state.users);

  useEffect(() => {
    if (fetchUsersStatus === 'idle') {
      dispatch(getCompanyUsers());
    }
  }, [dispatch, fetchUsersStatus]);

  const tabs = [
    { label: 'All', count: countAllUsers },
    { label: 'Active', count: countActiveUsers },
    { label: 'Blocked', count: countBlockedUsers },
    { label: 'Revoked', count: countRevokedUsers },
    { label: 'Pending', count: countPendingUsers },
  ];

  const filtered = users.filter((user: User) => {
    if (activeTab === 'All') return true;
    return user.status?.toLowerCase() === activeTab.toLowerCase();
  });

  const { deleteUserStatus, deleteUserError, updateUserStatus, updateUserError } = useAppSelector(state => state.users)
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);


  useEffect(() => {
    if (deleteUserStatus === 'succeeded') {
      setMessage('User deleted successfully!');
      setMessageType('success');
    } else if (deleteUserStatus === 'failed') {
      setMessage(deleteUserError || 'Failed to delete User!');
      setMessageType('error');
    }

    if (deleteUserStatus === 'succeeded' || deleteUserStatus === 'failed') {
      const timeout = setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [deleteUserStatus]);

  useEffect(() => {
    if (updateUserStatus === 'succeeded') {
      setMessage('User updated successfully!');
      setMessageType('success');
    } else if (updateUserStatus === 'failed') {
      setMessage(updateUserError || 'Failed to change user status!');
      setMessageType('error');
    }

    if (updateUserStatus === 'succeeded' || updateUserStatus === 'failed') {
      const timeout = setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [updateUserStatus]);


  return (
    <div className="border border-gray-100 shadow-md bg-white rounded-md overflow-hidden">
      {message && (
        <div className={`mx-4 mt-2 p-2 rounded-md text-sm font-medium ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
      <div className="flex gap-12 border-b border-gray-200 px-4 py-3">
        {tabs.map((tab, index) => {
          const isActive = tab.label === activeTab;
          return (
            <div
              key={index}
              onClick={() => setActiveTab(tab.label)}
              className={`flex items-center gap-2 cursor-pointer pb-2
                ${isActive ? 'border-b-2 border-blue-700' : 'hover:border-b-2 hover:border-gray-400'}`}
            >
              <p className={`text-sm ${isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                {tab.label}
              </p>
              <span
                className={`px-2 py-0.5 rounded-full text-sm
                ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}
              >
                {tab.count}
              </span>
            </div>
          );
        })}
      </div>

      <div className="p-4 flex flex-col gap-5 text-sm text-gray-600 min-h-[150px]">
        {fetchUsersStatus === 'loading' && (
          <div className="flex flex-col items-center justify-center py-8 w-full">
            <LoadingIcon />
            <p>Loading Users...</p>
          </div>
        )}

        {fetchUsersStatus === 'failed' && (
          <p className="text-red-600 text-center py-8">
            Error: {fetchUsersError || 'Failed to load Users.'}
          </p>
        )}

        {fetchUsersStatus === 'succeeded' && filtered.length === 0 && (
          <p className="text-center text-gray-500 py-8">No Users found.</p>
        )}

        {fetchUsersStatus === 'succeeded' &&
          filtered.map((user: User) => (
            <UsersInfoCard key={user.id} user={user} />
          ))}
      </div>
    </div>
  );
};

export default UsersDetail;
