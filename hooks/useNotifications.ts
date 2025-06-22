// hooks/useNotifications.ts
import { useState, useEffect, useCallback } from "react";
import { NotificationData, NotificationSettings } from "@/types/notification";
import { sortNotificationsByPriority } from "@/utils/notification";
export interface UseNotificationsReturn {
  notifications: NotificationData[];
  loading: boolean;
  error: string | null;
  settings: NotificationSettings | null;
  refreshNotifications: () => Promise<void>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  toggleImportant: (id: string) => void;
  updateSettings: (newSettings: Partial<NotificationSettings>) => Promise<void>;
}

export const useNotifications = (): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Replace with actual API call
      const response = await fetch("/api/notifications");
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
      const sortedNotifications = sortNotificationsByPriority(data);
      setNotifications(sortedNotifications);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch notifications";
      setError(errorMessage);
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSettings = useCallback(async () => {
    try {
      const response = await fetch("/api/notifications/settings");
      if (response.ok) {
        const settingsData = await response.json();
        setSettings(settingsData);
      }
    } catch (err) {
      console.error("Error fetching notification settings:", err);
    }
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );

    // API call to mark as read
    fetch(`/api/notifications/${id}/read`, { method: "PATCH" }).catch((err) =>
      console.error("Error marking notification as read:", err)
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );

    // API call to mark all as read
    fetch("/api/notifications/read-all", { method: "PATCH" }).catch((err) =>
      console.error("Error marking all notifications as read:", err)
    );
  }, []);

  const toggleImportant = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isImportant: !notification.isImportant }
          : notification
      )
    );

    // API call to toggle importance
    fetch(`/api/notifications/${id}/important`, { method: "PATCH" }).catch(
      (err) => console.error("Error toggling notification importance:", err)
    );
  }, []);

  const updateSettings = useCallback(
    async (newSettings: Partial<NotificationSettings>) => {
      try {
        const response = await fetch("/api/notifications/settings", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSettings),
        });

        if (response.ok) {
          const updatedSettings = await response.json();
          setSettings(updatedSettings);
        }
      } catch (err) {
        console.error("Error updating notification settings:", err);
      }
    },
    []
  );

  const refreshNotifications = useCallback(async () => {
    await fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    fetchNotifications();
    fetchSettings();
  }, [fetchNotifications, fetchSettings]);

  return {
    notifications,
    loading,
    error,
    settings,
    refreshNotifications,
    markAsRead,
    markAllAsRead,
    toggleImportant,
    updateSettings,
  };
};
