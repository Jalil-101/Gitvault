// app/(tabs)/notifications.tsx
import { EmptyNotifications } from "@/components/notifications/EmptyNotifications";
import { NotificationFilter } from "@/components/notifications/NotificationFilter";
import { NotificationHeader } from "@/components/notifications/NotificationHeader";
import { NotificationData, NotificationItem } from "@/components/notifications/NotificationItem";

import { useModernTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useMemo, useState } from "react";
import {
  ColorValue,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet
  
} from "react-native";


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
  {
    key: "participating",
    label: "Active",
    count: 0, // Will be calculated
    icon: "person-circle",
  },
  {
    key: "mentions",
    label: "Mentions",
    count: 0, // Will be calculated
    icon: "at-circle",
  },
];

export default function NotificationsScreen() {
  const { colors, isDarkTheme, gradients } = useModernTheme();
  const [notifications, setNotifications] =
    useState<NotificationData[]>(mockNotifications);
  const [activeFilter, setActiveFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  // Calculate filter counts
  const filtersWithCounts = useMemo(() => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    const participatingCount = notifications.filter(
      (n) => n.type === "pull_request" || n.type === "issue"
    ).length;
    const mentionsCount = notifications.filter((n) => n.isImportant).length;

    return notificationFilters.map((filter) => ({
      ...filter,
      count:
        filter.key === "all"
          ? notifications.length
          : filter.key === "unread"
          ? unreadCount
          : filter.key === "participating"
          ? participatingCount
          : filter.key === "mentions"
          ? mentionsCount
          : 0,
    }));
  }, [notifications]);

  // Filter notifications based on active filter
  const filteredNotifications = useMemo(() => {
    switch (activeFilter) {
      case "unread":
        return notifications.filter((n) => !n.isRead);
      case "participating":
        return notifications.filter(
          (n) => n.type === "pull_request" || n.type === "issue"
        );
      case "mentions":
        return notifications.filter((n) => n.isImportant);
      default:
        return notifications;
    }
  }, [notifications, activeFilter]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const handleNotificationPress = useCallback((id: string) => {
    // Handle notification press - navigate to details
    console.log("Notification pressed:", id);
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
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
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
            : activeFilter === "participating"
            ? "No participating notifications"
            : activeFilter === "mentions"
            ? "No mentions"
            : "No notifications yet"
        }
        onRefresh={handleRefresh}
      />
    ),
    [activeFilter, handleRefresh]
  );

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
        } // Cast to the required type
        style={StyleSheet.absoluteFillObject}
      />
        {/* Header */}
        <NotificationHeader
          unreadCount={unreadCount}
          onMarkAllAsRead={handleMarkAllAsRead}
          onSettings={handleSettings}
        />

        {/* Filters */}
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
              paddingTop: 16, // Add some top padding for the enhanced cards
              paddingBottom: Platform.OS === "ios" ? 120 : 100, // Increased bottom padding
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
            // Remove ItemSeparatorComponent since the enhanced cards have their own spacing
            // ItemSeparatorComponent={() => <View className="h-1" />}
          />
    
      
    </SafeAreaView>
  );
}

// // components/notifications/index.ts
// export { EmptyNotifications } from "./EmptyNotifications";
// export { NotificationFilter } from "./NotificationFilter";
// export { NotificationHeader } from "./NotificationHeader";
// export { NotificationItem } from "./NotificationItem";
// export type { NotificationData } from "./NotificationItem";
