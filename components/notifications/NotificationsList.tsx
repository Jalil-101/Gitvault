// components/notifications/NotificationsList.tsx
import { useModernTheme } from "@/context/ThemeContext";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NotificationData, NotificationItem } from "./NotificationItem";

interface NotificationsListProps {
  notifications: NotificationData[];
  onNotificationPress: (id: string) => void;
  onMarkAsRead?: (id: string) => void;
  title?: string;
}

export const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  onNotificationPress,
  onMarkAsRead,
  title = "Notifications",
}) => {
  const { colors, isDarkTheme } = useModernTheme();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            borderBottomColor: colors.border.tertiary,
          },
        ]}
      >
        <Text style={[styles.title, { color: colors.text.primary }]}>
          {title}
        </Text>
        {unreadCount > 0 && (
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </Text>
        )}
      </View>

      {/* Scrollable Notifications */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onPress={onNotificationPress}
              onMarkAsRead={onMarkAsRead}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.text.tertiary }]}>
              No notifications yet
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
  },
});
