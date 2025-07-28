// components/notifications/NotificationItem.tsx
import { useModernTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface NotificationData {
  id: string;
  type:
    | "pull_request"
    | "issue"
    | "push"
    | "star"
    | "fork"
    | "release"
    | "like"
    | "comment"
    | "todo";
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
    like: "heart",
    comment: "chatbubble-outline",
    todo: "checkmark-circle-outline",
  };
  return iconMap[type];
};

const getNotificationColor = (type: NotificationData["type"]) => {
  const colorMap = {
    pull_request: "blue",
    issue: "orange",
    push: "green",
    star: "yellow",
    fork: "purple",
    release: "indigo",
    like: "red",
    comment: "blue",
    todo: "green",
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
      style={[
        styles.container,
        {
          backgroundColor: colors.surface.primary,
          ...shadows.md,
          borderWidth: notification.isRead ? 0 : 1,
          borderColor: notification.isRead
            ? "transparent"
            : `${accentColor.main}20`,
        },
      ]}
    >
      <View style={styles.content}>
        {/* Enhanced Notification Icon */}
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.iconBackground,
              {
                backgroundColor: colors.surface.secondary,
                ...shadows.sm,
                borderWidth: 2,
                borderColor: `${accentColor.main}15`,
              },
            ]}
          >
            <LinearGradient
              colors={accentColor.gradient}
              style={styles.iconGradient}
            >
              <Ionicons name={iconName} size={18} color={colors.text.inverse} />
            </LinearGradient>
          </View>
        </View>

        {/* Enhanced Content */}
        <View style={styles.textContainer}>
          <View style={styles.headerRow}>
            <View style={styles.titleContainer}>
              {/* Title with better spacing */}
              <Text
                numberOfLines={2}
                style={[
                  styles.title,
                  {
                    color: notification.isRead
                      ? colors.text.tertiary
                      : colors.text.primary,
                  },
                ]}
              >
                {notification.title}
              </Text>

              {/* Repository info with enhanced styling */}
              <View style={styles.repositoryInfo}>
                <Text
                  style={[styles.repository, { color: colors.text.secondary }]}
                >
                  {notification.repository}
                </Text>
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: colors.text.tertiary },
                  ]}
                />
                <Text style={[styles.author, { color: colors.text.tertiary }]}>
                  by {notification.author}
                </Text>
              </View>

              {/* Time with subtle styling */}
              <Text style={[styles.time, { color: colors.text.tertiary }]}>
                {notification.time}
              </Text>
            </View>

            {/* Enhanced Action Buttons */}
            <View style={styles.actionButtons}>
              {notification.isImportant && (
                <View
                  style={[
                    styles.importantBadge,
                    { backgroundColor: colors.surface.secondary },
                  ]}
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
                  style={[
                    styles.readButton,
                    {
                      backgroundColor: `${accentColor.main}15`,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.readDot,
                      { backgroundColor: accentColor.main },
                    ]}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Enhanced bottom accent for unread notifications */}
      {!notification.isRead && (
        <View style={styles.bottomAccent}>
          <LinearGradient
            colors={[
              `${accentColor.main}40`,
              accentColor.main,
              `${accentColor.main}40`,
            ]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 20,
  },
  iconContainer: {
    marginRight: 16,
    marginTop: 2,
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  iconGradient: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    marginBottom: 8,
  },
  repositoryInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  repository: {
    fontSize: 14,
    fontWeight: "500",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 8,
  },
  author: {
    fontSize: 14,
  },
  time: {
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  importantBadge: {
    padding: 6,
    borderRadius: 8,
  },
  readButton: {
    padding: 8,
    borderRadius: 8,
  },
  readDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  bottomAccent: {
    height: 4,
  },
  gradient: {
    flex: 1,
  },
});
