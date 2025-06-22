// components/notifications/NotificationItem.tsx
import React from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export interface NotificationData {
  id: string;
  type: "pull_request" | "issue" | "push" | "star" | "fork" | "release";
  title: string;
  repository: string;
  author: string;
  time: string;
  isRead: boolean;
  isImportant?: boolean;
}

interface NotificationItemProps {
  notification: NotificationData;
  onPress: (id: string) => void;
  onMarkAsRead?: (id: string) => void;
}

const getNotificationIcon = (
  type: NotificationData["type"]
): keyof typeof Ionicons.glyphMap => {
  const iconMap: Record<
    NotificationData["type"],
    keyof typeof Ionicons.glyphMap
  > = {
    pull_request: "git-pull-request-outline",
    issue: "alert-circle-outline",
    push: "git-commit-outline",
    star: "star",
    fork: "git-branch",
    release: "cube-outline",
  };
  return iconMap[type];
};

const getNotificationColor = (type: NotificationData["type"]) => {
  const colorMap = {
    pull_request: "blue",
    issue: "orange",
    push: "green",
    star: "red",
    fork: "purple",
    release: "indigo",
  };
  return colorMap[type];
};

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onPress,
  onMarkAsRead,
}) => {
  const { colors, isDarkTheme, shadows } = useModernTheme();

  const colorKey = getNotificationColor(notification.type);
  const accentColor = colors.accents[colorKey as keyof typeof colors.accents];
  const iconName = getNotificationIcon(notification.type);

  return (
    <Pressable
      onPress={() => onPress(notification.id)}
      className={`mx-4 mb-4 rounded-2xl overflow-hidden ${
        isDarkTheme
          ? "bg-modern-dark-surface-primary"
          : "bg-modern-light-surface-primary"
      }`}
      style={[
        shadows.md,
        {
          borderWidth: notification.isRead ? 0 : 1,
          borderColor: notification.isRead
            ? "transparent"
            : `${accentColor.main}20`,
        },
      ]}
    >
      <View className="flex-row items-start p-5">
        {/* Enhanced Notification Icon */}
        <View className="mr-4 mt-0.5">
          <View
            className={`w-12 h-12 rounded-2xl items-center justify-center ${
              isDarkTheme
                ? "bg-modern-dark-surface-secondary"
                : "bg-modern-light-surface-secondary"
            }`}
            style={[
              shadows.sm,
              {
                borderWidth: 2,
                borderColor: `${accentColor.main}15`,
              },
            ]}
          >
            <LinearGradient
              colors={accentColor.gradient}
              className="w-8 h-8 rounded-xl items-center justify-center"
            >
              <Ionicons name={iconName} size={18} color={colors.text.inverse} />
            </LinearGradient>
          </View>
        </View>

        {/* Enhanced Content */}
        <View className="flex-1">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 mr-3">
              {/* Title with better spacing */}
              <Text
                numberOfLines={2}
                className={`text-base font-semibold leading-6 mb-2 ${
                  notification.isRead
                    ? isDarkTheme
                      ? "text-modern-dark-text-tertiary"
                      : "text-modern-light-text-tertiary"
                    : isDarkTheme
                    ? "text-modern-dark-text-primary"
                    : "text-modern-light-text-primary"
                }`}
              >
                {notification.title}
              </Text>

              {/* Repository info with enhanced styling */}
              <View className="flex-row items-center mb-2">
                <Text
                  className={`text-sm font-medium ${
                    isDarkTheme
                      ? "text-modern-dark-text-secondary"
                      : "text-modern-light-text-secondary"
                  }`}
                >
                  {notification.repository}
                </Text>
                <View
                  className={`w-1 h-1 rounded-full mx-2 ${
                    isDarkTheme
                      ? "bg-modern-dark-text-muted"
                      : "bg-modern-light-text-muted"
                  }`}
                />
                <Text
                  className={`text-sm ${
                    isDarkTheme
                      ? "text-modern-dark-text-muted"
                      : "text-modern-light-text-muted"
                  }`}
                >
                  by {notification.author}
                </Text>
              </View>

              {/* Time with subtle styling */}
              <Text
                className={`text-xs ${
                  isDarkTheme
                    ? "text-modern-dark-text-muted"
                    : "text-modern-light-text-muted"
                }`}
              >
                {notification.time}
              </Text>
            </View>

            {/* Enhanced Action Buttons */}
            <View className="flex-col items-center space-y-2">
              {notification.isImportant && (
                <View
                  className={`p-1.5 rounded-lg ${
                    isDarkTheme
                      ? "bg-modern-dark-surface-secondary"
                      : "bg-modern-light-surface-secondary"
                  }`}
                >
                  <Ionicons
                    name="flame-outline"
                    size={14}
                    color={colors.status.warning.main}
                  />
                </View>
              )}

              {!notification.isRead && (
                <TouchableOpacity
                  onPress={() => onMarkAsRead?.(notification.id)}
                  className="p-2"
                  style={{
                    borderRadius: 8,
                    backgroundColor: `${accentColor.main}15`,
                  }}
                >
                  <View
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: accentColor.main }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Enhanced bottom accent for unread notifications */}
      {!notification.isRead && (
        <View className="h-1">
          <LinearGradient
            colors={[
              `${accentColor.main}40`,
              accentColor.main,
              `${accentColor.main}40`,
            ]}
            className="h-full"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </View>
      )}
    </Pressable>
  );
};
