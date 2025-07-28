// store/notificationStore.ts
import { create } from "zustand";
import { pushNotificationService } from "@/services/PushNotificationService";

export interface NotificationItem {
  id: string;
  type: "like" | "comment" | "todo" | "star" | "fork" | "release" | "pull_request" | "issue" | "push";
  title: string;
  message: string;
  author: string;
  repository?: string;
  postId?: string;
  todoId?: string;
  repoId?: string;
  timestamp: Date;
  isRead: boolean;
  isImportant?: boolean;
  data?: any;
}

interface NotificationStore {
  notifications: NotificationItem[];
  unreadCount: number;
  isLoading: boolean;
  
  // Actions
  addNotification: (notification: Omit<NotificationItem, "id" | "timestamp" | "isRead">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  
  // Specific notification types
  addLikeNotification: (postId: string, postTitle: string, likerName: string, postAuthor: string) => void;
  addCommentNotification: (postId: string, postTitle: string, commenterName: string, postAuthor: string) => void;
  addTodoNotification: (todoId: string, todoTitle: string, deadline: Date) => void;
  addRepositoryStarNotification: (repoId: string, repoName: string, starrerName: string) => void;
  
  // Load and save
  loadNotifications: () => Promise<void>;
  saveNotifications: () => Promise<void>;
}

const STORAGE_KEY = "notifications";

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  addNotification: (notificationData) => {
    const newNotification: NotificationItem = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false,
    };

    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));

    // Send push notification
    pushNotificationService.presentNotification(
      newNotification.title,
      newNotification.message,
      {
        type: newNotification.type,
        notificationId: newNotification.id,
        ...newNotification.data,
      }
    );

    get().saveNotifications();
  },

  markAsRead: (id: string) => {
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));
    get().saveNotifications();
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
      unreadCount: 0,
    }));
    get().saveNotifications();
  },

  removeNotification: (id: string) => {
    set((state) => {
      const notification = state.notifications.find((n) => n.id === id);
      return {
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: notification?.isRead ? state.unreadCount : Math.max(0, state.unreadCount - 1),
      };
    });
    get().saveNotifications();
  },

  clearAllNotifications: () => {
    set({
      notifications: [],
      unreadCount: 0,
    });
    get().saveNotifications();
  },

  // Specific notification types
  addLikeNotification: (postId: string, postTitle: string, likerName: string, postAuthor: string) => {
    const notification = {
      type: "like" as const,
      title: "New Like",
      message: `${likerName} liked your post: ${postTitle}`,
      author: likerName,
      postId,
      data: { postId, postTitle, likerName, postAuthor },
    };

    get().addNotification(notification);
  },

  addCommentNotification: (postId: string, postTitle: string, commenterName: string, postAuthor: string) => {
    const notification = {
      type: "comment" as const,
      title: "New Comment",
      message: `${commenterName} commented on your post: ${postTitle}`,
      author: commenterName,
      postId,
      data: { postId, postTitle, commenterName, postAuthor },
    };

    get().addNotification(notification);
  },

  addTodoNotification: (todoId: string, todoTitle: string, deadline: Date) => {
    const notification = {
      type: "todo" as const,
      title: "Todo Deadline",
      message: `Your task is due: ${todoTitle}`,
      author: "System",
      todoId,
      data: { todoId, todoTitle, deadline: deadline.toISOString() },
    };

    get().addNotification(notification);
  },

  addRepositoryStarNotification: (repoId: string, repoName: string, starrerName: string) => {
    const notification = {
      type: "star" as const,
      title: "Repository Starred",
      message: `${starrerName} starred your repository: ${repoName}`,
      author: starrerName,
      repository: repoName,
      repoId,
      data: { repoId, repoName, starrerName },
    };

    get().addNotification(notification);
  },

  loadNotifications: async () => {
    set({ isLoading: true });
    try {
      // In a real app, you'd load from AsyncStorage or API
      // For now, we'll start with empty notifications
      set({
        notifications: [],
        unreadCount: 0,
      });
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  saveNotifications: async () => {
    try {
      // In a real app, you'd save to AsyncStorage or API
      const { notifications } = get();
      console.log("💾 Saved notifications:", notifications.length);
    } catch (error) {
      console.error("Error saving notifications:", error);
    }
  },
})); 