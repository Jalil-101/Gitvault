// components/notifications/NotificationsList.tsx
import React from "react";
import { ScrollView, View, Text } from "react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { NotificationItem, NotificationData } from "./NotificationItem";

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
  const { colors, isDarkTheme } = useModernTheme() as unknown as { colors: { modern: any }; isDarkTheme: boolean };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <View className="flex-1">
      {/* Header */}
      <View
        className="px-4 py-3 border-b border-opacity-10"
        style={{
          borderBottomColor: isDarkTheme
            ? colors.modern.dark.text.muted
            : colors.modern.light.text.muted,
        }}
      >
        <Text
          className={`text-xl font-bold ${
            isDarkTheme
              ? "text-modern-dark-text-primary"
              : "text-modern-light-text-primary"
          }`}
        >
          {title}
        </Text>
        {unreadCount > 0 && (
          <Text
            className={`text-sm mt-1 ${
              isDarkTheme
                ? "text-modern-dark-text-secondary"
                : "text-modern-light-text-secondary"
            }`}
          >
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </Text>
        )}
      </View>

      {/* Scrollable Notifications */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 100,
        
        }}
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
          <View className="flex items-center justify-center py-16">
            <Text
              className={`text-base ${
                isDarkTheme
                  ? "text-modern-dark-text-muted"
                  : "text-modern-light-text-muted"
              }`}
            >
              No notifications yet
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
