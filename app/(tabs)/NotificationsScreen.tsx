// app/(tabs)/notifications.tsx
import { EmptyNotifications } from "@/components/notifications/EmptyNotifications";
import { NotificationFilter } from "@/components/notifications/NotificationFilter";
import { NotificationHeader } from "@/components/notifications/NotificationHeader";
import {
  NotificationData,
  NotificationItem,
} from "@/components/notifications/NotificationItem";
import { pushNotificationService } from "@/services/PushNotificationService";
import { useModernTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import {
  ColorValue,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import NotificationTestButton from "@/components/notifications/NotificationTestButton";

// Mock data for demonstration
const mockNotifications: NotificationData[] = [
  {
    id: "1",
    type: "pull_request",
    title: "Fix authentication bug in login component",
    repository: "myapp-frontend",
    author: "john.doe",
    time: "2 hours ago",
    isRead: false,
    isImportant: true,
  },
  {
    id: "2",
    type: "issue",
    title: "App crashes when uploading large files",
    repository: "myapp-backend",
    author: "jane.smith",
    time: "4 hours ago",
    isRead: false,
  },
  {
    id: "3",
    type: "star",
    title: "starred your repository",
    repository: "react-native-components",
    author: "developer123",
    time: "1 day ago",
    isRead: true,
  },
  {
    id: "4",
    type: "push",
    title: "New commits pushed to main branch",
    repository: "myapp-api",
    author: "team.lead",
    time: "2 days ago",
    isRead: false,
  },
  {
    id: "5",
    type: "fork",
    title: "forked your repository",
    repository: "ui-toolkit",
    author: "opensource.dev",
    time: "3 days ago",
    isRead: true,
  },
  {
    id: "6",
    type: "release",
    title: "New release v2.1.0 is available",
    repository: "dependency-lib",
    author: "maintainer",
    time: "1 week ago",
    isRead: false,
  },
];

// Updated filters - removed "participating" (Active) and "mentions" as requested
const notificationFilters = [
  {
    key: "all",
    label: "All",
    count: 0, // Will be calculated
    icon: "notifications",
  },
  {
    key: "unread",
    label: "Unread",
    count: 0, // Will be calculated
    icon: "notifications-circle",
  },
];

export default function NotificationsScreen() {
  const { colors, isDarkTheme, gradients } = useModernTheme();
  const [notifications, setNotifications] =
    useState<NotificationData[]>(mockNotifications);
  const [activeFilter, setActiveFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [pushToken, setPushToken] = useState<string | null>(null);

  // Initialize push notifications
  useEffect(() => {
    initializePushNotifications();
  }, []);

  const initializePushNotifications = async () => {
    try {
      const token = await pushNotificationService.initialize();
      setPushToken(token);

      // Send token to your backend here
      if (token) {
        console.log("Push token ready to send to backend:", token);
        // await sendTokenToBackend(token);
      }

      // Set up notification listeners
      const cleanup = pushNotificationService.setupNotificationListeners(
        (notification) => {
          // Handle notification received while app is in foreground
          console.log("Received notification:", notification);
          handleNewNotification(notification);
        },
        (response) => {
          // Handle notification tap
          console.log("Notification tapped:", response);
          handleNotificationTap(response);
        }
      );

      return cleanup;
    } catch (error) {
      console.error("Failed to initialize push notifications:", error);
    }
  };

  const handleNewNotification = (notification: any) => {
    // Convert the push notification to your NotificationData format
    const newNotification: NotificationData = {
      id: notification.request.identifier,
      type: notification.request.content.data?.type || "push",
      title: notification.request.content.title || "New Notification",
      repository: notification.request.content.data?.repository || "Unknown",
      author: notification.request.content.data?.author || "System",
      time: "Just now",
      isRead: false,
      isImportant: notification.request.content.data?.isImportant || false,
    };

    // Add to notifications list
    setNotifications((prev) => [newNotification, ...prev]);

    // Update badge count
    const unreadCount = notifications.filter((n) => !n.isRead).length + 1;
    pushNotificationService.setBadgeCount(unreadCount);
  };

  const handleNotificationTap = (response: any) => {
    // Navigate to specific screen based on notification data
    const data = response.notification.request.content.data;
    if (data?.screen) {
      // navigation.navigate(data.screen, data.params || {});
      console.log("Navigate to:", data.screen, data.params);
    }
  };

  // Set up focus effect to update badge count
  useFocusEffect(
    useCallback(() => {
      const unreadCount = notifications.filter((n) => !n.isRead).length;
      pushNotificationService.setBadgeCount(unreadCount);
    }, [notifications])
  );

  // Calculate filter counts - simplified for only 2 filters
  const filtersWithCounts = useMemo(() => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return notificationFilters.map((filter) => ({
      ...filter,
      count:
        filter.key === "all"
          ? notifications.length
          : filter.key === "unread"
          ? unreadCount
          : 0,
    }));
  }, [notifications]);

  // Filter notifications based on active filter - simplified
  const filteredNotifications = useMemo(() => {
    switch (activeFilter) {
      case "unread":
        return notifications.filter((n) => !n.isRead);
      default:
        return notifications;
    }
  }, [notifications, activeFilter]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const handleNotificationPress = useCallback((id: string) => {
    // Handle notification press - navigate to details and mark as read
    console.log("Notification pressed:", id);
    handleMarkAsRead(id);
    // router.push(`/notification/${id}`);
  }, []);

  const handleMarkAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
    // Update badge count to 0
    pushNotificationService.setBadgeCount(0);
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Fetch new notifications from your API
      // const newNotifications = await fetchNotifications();
      // setNotifications(newNotifications);

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error refreshing notifications:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleSettings = useCallback(() => {
    // Navigate to notification settings
    console.log("Settings pressed");
    // router.push('/settings/notifications');
  }, []);

  const renderNotificationItem = ({ item }: { item: NotificationData }) => (
    <NotificationItem
      notification={item}
      onPress={handleNotificationPress}
      onMarkAsRead={handleMarkAsRead}
    />
  );

  const renderEmptyState = useCallback(
    () => (
      <EmptyNotifications
        message={
          activeFilter === "unread"
            ? "No unread notifications"
            : "No notifications yet"
        }
        onRefresh={handleRefresh}
      />
    ),
    [activeFilter, handleRefresh]
  );

  // Helper function for testing push notifications (you can call this from a button)
  const testPushNotification = useCallback(async () => {
    try {
      await pushNotificationService.presentNotification(
        "Test Notification",
        "This is a test push notification",
        {
          type: "test",
          repository: "test-repo",
          author: "Test User",
          isImportant: true,
        }
      );
    } catch (error) {
      console.error("Error sending test notification:", error);
    }
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />

      <LinearGradient
        colors={
          gradients.background as [ColorValue, ColorValue, ...ColorValue[]]
        }
        style={StyleSheet.absoluteFillObject}
      />

      {/* Header */}
      <NotificationHeader
        unreadCount={unreadCount}
        onMarkAllAsRead={handleMarkAllAsRead}
        onSettings={handleSettings}
      />

      {/* Filters - Now only shows All and Unread with better spacing */}
      <NotificationFilter
        filters={filtersWithCounts}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Notifications List */}
      <FlatList
        data={filteredNotifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 16,
          paddingBottom: Platform.OS === "ios" ? 120 : 100,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.interactive.primary}
            colors={[colors.interactive.primary]}
          />
        }
        ListEmptyComponent={renderEmptyState}
      />
      
    </SafeAreaView>
  );
}

// Helper function to send token to your backend
async function sendTokenToBackend(token: string) {
  try {
    // Replace with your actual API endpoint
    const response = await fetch("YOUR_API_ENDPOINT/push-tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add your auth headers here
      },
      body: JSON.stringify({
        token,
        platform: "expo",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to register push token");
    }

    console.log("Push token registered successfully");
  } catch (error) {
    console.error("Error registering push token:", error);
  }
}
