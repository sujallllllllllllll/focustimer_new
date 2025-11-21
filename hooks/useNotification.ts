import { useEffect, useState, useCallback } from 'react';

export function useNotification() {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      console.warn('Notifications not supported');
      return false;
    }

    if (permission === 'granted') return true;

    const result = await Notification.requestPermission();
    setPermission(result);
    return result === 'granted';
  }, [permission]);

  const showNotification = useCallback(
    (title: string, body: string, options?: NotificationOptions) => {
      if (typeof window === 'undefined' || !('Notification' in window) || permission !== 'granted') {
        return;
      }

      const notification = new Notification(title, {
        body,
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        tag: 'timemaster-timer',
        requireInteraction: true,
        ...options,
      });

      // Auto-close after 10 seconds
      setTimeout(() => notification.close(), 10000);

      return notification;
    },
    [permission]
  );

  return {
    permission,
    requestPermission,
    showNotification,
    isSupported: typeof window !== 'undefined' && 'Notification' in window,
  };
}
