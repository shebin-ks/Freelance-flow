import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { changeMessageStatus, updateMessage } from '../redux/features/messages/messageSlice';
import { addLeadLocally, removeLeadLocally } from '../redux/features/leads/leadSlice';
import { addNotification } from '../redux/features/notification/notificationSlice';

export const socket = io('http://localhost:3000', {
  transports: ['websocket'],
  autoConnect: true,
  withCredentials: true,
});

interface NotificationPayload {
  type:
  | 'LEAD_CREATED'
  | 'PAYMENT_RECEIVED'
  | 'REMINDER_ADDED'
  | 'LEAD_DELETED'
  | 'LEAD_STATUS_CHANGED'
  | 'REMINDER_CREATED'
  | 'REMINDER_COMPLETED';
  message: string;
  data?: any;
  createdAt: string;
}

export const SocketProvider = () => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      const userId = user?.id;
      const companyId = user?.company?.id;

      if (!socket.connected) {
        socket.connect();
      }

      if (userId) {
        socket.emit('joinUserRoom', userId);
      }

      if (companyId) {
        socket.emit('joinCompany', companyId);
      }

      socket.on('notification', (payload: NotificationPayload) => {
        if (payload.type === 'LEAD_DELETED') {
          dispatch(removeLeadLocally(payload.data.leadId));
        }
        if (payload.type === 'LEAD_CREATED') {
          dispatch(addLeadLocally({ lead: payload.data.lead, currentUserId: userId }));
        }


        const existing = JSON.parse(localStorage.getItem('notifications') || '[]')

        const newNotification = {
          id: Date.now(),
          type: payload.type,
          message: payload.message || 'New notification',
          data: payload.data,
          createdAt: payload.createdAt,
          seen: false,
        }

        localStorage.setItem('notifications', JSON.stringify([newNotification, ...existing]));

        dispatch(addNotification(newNotification))

        // toast.info(payload.message || 'New notification');
        console.log('Received Notification: ', payload);
      });

      socket.on('messagesSeen', ({ byUserId }) => {
        dispatch(changeMessageStatus({ byUserId, status: 'seen' }));
      });

      socket.on('messageDelivered', ({ byUserId }) => {
        dispatch(changeMessageStatus({ byUserId, status: 'delivered' }));
      });

      socket.on('messageUpdated', (updatedMessage) => {
        dispatch(updateMessage(updatedMessage));
      });
    } else {

      if (socket.connected) {
        socket.disconnect();
        console.log('Socket disconnected on logout');
      }
    }

    return () => {
      socket.off('notification');
      socket.off('messagesSeen');
      socket.off('messageDelivered');
      socket.off('messageUpdated');
    };
  }, [user]);


  return null
};
