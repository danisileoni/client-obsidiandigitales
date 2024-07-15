import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

interface Notification {
  message: string;
}

export const useSocket = (orderId: string) => {
  const [notification, setNotification] = useState<Notification>();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_HOST_WEBHOOK, {
      path: 'process-order',
      query: { orderId },
      transports: ['websocket'],
    });

    newSocket.on('notification', (message: string) => {
      setNotification({ message });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [orderId]);

  return { notification, socket };
};
