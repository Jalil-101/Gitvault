// app/(tabs)/NotificationsScreen.tsx
import { useModernTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EmptyNotifications } from "@/components/notifications/EmptyNotifications";
import { NotificationFilter } from "@/components/notifications/NotificationFilter";
import { NotificationHeader } from "@/components/notifications/NotificationHeader";
import { NotificationItem } from "@/components/notifications/NotificationItem";
import {
  NotificationItem as StoreNotificationItem,
  useNotificationStore,
} from "@/store/notificationStore";

type FilterType = "all" | "social" | "todos";

export default function NotificationsScreen() {
  const { colors, isDarkTheme, shadows, gradients } = useModernTheme();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    loadNotifications,
  } = useNotificationStore();

  useEffect(() => {
    loadNotifications();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  };

  const handleNotificationPress = (id: string) => {
    markAsRead(id);
    // Navigate to relevant screen based on notification type
    const notification = notifications.find((n) => n.id === id);
    if (notification) {
      console.log("Navigating to notification:", notification.type);
      // Add navigation logic here
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  const getFilteredNotifications = () => {
    switch (activeFilter) {
      case "social":
        return notifications.filter((n) =>
          ["like", "comment", "star"].includes(n.type)
        );
      case "todos":
        return notifications.filter((n) => n.type === "todo");
      default:
        return notifications;
    }
  };

  const getFilterData = () => {
    const allCount = notifications.length;
    const socialCount = notifications.filter((n) =>
      ["like", "comment", "star"].includes(n.type)
    ).length;
    const todosCount = notifications.filter((n) => n.type === "todo").length;

    return [
      {
        key: "all",
        label: "All",
        count: allCount,
        icon: "notifications-outline",
      },
      {
        key: "social",
        label: "Social",
        count: socialCount,
        icon: "people-outline",
      },
      {
        key: "todos",
        label: "Todos",
        count: todosCount,
        icon: "checkmark-circle-outline",
      },
    ];
  };

  const renderNotificationItem = ({
    item,
  }: {
    item: StoreNotificationItem;
  }) => {
    // Convert store notification to component notification format
    const notificationData = {
      id: item.id,
      type: item.type as any,
      title: item.title,
      repository: item.repository || "",
      author: item.author,
      time: formatTime(item.timestamp),
      isRead: item.isRead,
      isImportant: item.isImportant,
    };

    return (
      <NotificationItem
        notification={notificationData}
        onPress={handleNotificationPress}
        onMarkAsRead={markAsRead}
      />
    );
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  const filteredNotifications = getFilteredNotifications();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />
      <LinearGradient
        colors={gradients.background}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <NotificationHeader
          unreadCount={unreadCount}
          onMarkAllAsRead={handleMarkAllAsRead}
          onSettings={handleSettings}
        />

        {/* Filter */}
        <NotificationFilter
          filters={getFilterData()}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <FlatList
            data={filteredNotifications}
            renderItem={renderNotificationItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.interactive.primary}
                colors={[colors.interactive.primary]}
              />
            }
          />
        ) : (
          <EmptyNotifications
            message={
              activeFilter === "all"
                ? "No notifications yet"
                : activeFilter === "social"
                ? "No social notifications"
                : "No todo notifications"
            }
            onRefresh={onRefresh}
          />
        )}

        {/* Test Button */}
        <View style={styles.testButtonContainer}>
          <TouchableOpacity
            style={[
              styles.testButton,
              {
                backgroundColor: colors.interactive.primary,
                ...shadows.md,
              },
            ]}
            onPress={() => {
              // Add test notifications
              const {
                addLikeNotification,
                addCommentNotification,
                addTodoNotification,
              } = useNotificationStore.getState();

              addLikeNotification(
                "post-1",
                "My Awesome Post",
                "john_doe",
                "current_user"
              );
              addCommentNotification(
                "post-1",
                "My Awesome Post",
                "jane_smith",
                "current_user"
              );
              addTodoNotification(
                "todo-1",
                "Complete project",
                new Date(Date.now() + 86400000)
              );
            }}
          >
            <Ionicons
              name="add-circle-outline"
              size={20}
              color={colors.text.inverse}
            />
            <Text
              style={[styles.testButtonText, { color: colors.text.inverse }]}
            >
              Add Test Notifications
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 100,
  },
  testButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  testButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  testButtonText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
