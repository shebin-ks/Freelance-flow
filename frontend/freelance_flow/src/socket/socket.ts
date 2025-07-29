import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';





export interface NotificationPayload {
  type: 'LEAD_CREATED' | 'PAYMENT_RECEIVED' | 'REMINDER_ADDED' | 'LEAD_DELETED';
  message: string;
  data?: any;
  createdAt: string;
}


const socket = io('http://localhost:3000', {
  withCredentials: true,
  transports: ['websocket'],
});


export const useCompanySocket = () => {
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {


    const companyId = user?.company?.id;
    if (!companyId) return;

    console.log("Connecting to socket for company:", companyId);
    socket.emit('joinCompany', companyId);

    socket.on('notification', (payload: NotificationPayload) => {
      toast.info(payload.message || 'New notification received!');
    });

    return () => {
      socket.off('notification');
    };
  }, [user]);
};