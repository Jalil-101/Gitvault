import { useState, useCallback, useEffect } from "react";
import type { Notification, FilterType } from "@/types/notifications";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadNotifications = useCallback(async () => {
    // API logic here
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  }, [loadNotifications]);

  const markAsRead = useCallback((ids: string[]) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        ids.includes(notification.id)
          ? {
              ...notification,
              unread: false,
              last_read_at: new Date().toISOString(),
            }
          : notification
      )
    );
  }, []);

  const markAsUnread = useCallback((ids: string[]) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        ids.includes(notification.id)
          ? { ...notification, unread: true, last_read_at: null }
          : notification
      )
    );
  }, []);

  return {
    notifications,
    loading,
    refreshing,
    loadNotifications,
    onRefresh,
    markAsRead,
    markAsUnread,
  };
};
