// components/notifications/NotificationItem.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// Types (these would ideally be imported from your types file)
interface NotificationUser {
  login: string;
  avatar_url: string;
}

interface NotificationRepository {
  name: string;
  full_name: string;
  owner: {
    login: string;
  };
}

interface NotificationSubject {
  title: string;
  type: "Issue" | "PullRequest" | "Commit" | "Release" | "Discussion";
  url: string;
}

interface Notification {
  id: string;
  unread: boolean;
  reason:
    | "assign"
    | "author"
    | "comment"
    | "invitation"
    | "manual"
    | "mention"
    | "review_requested"
    | "security_alert"
    | "state_change"
    | "subscribed"
    | "team_mention";
  updated_at: string;
  last_read_at: string | null;
  subject: NotificationSubject;
  repository: NotificationRepository;
  url: string;
}

// Utility functions (these would ideally be imported from your utils file)
const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
};

const getReasonText = (reason: Notification["reason"]): string => {
  const reasonMap: Record<Notification["reason"], string> = {
    assign: "You were assigned",
    author: "You authored",
    comment: "New comment",
    invitation: "You were invited",
    manual: "You subscribed",
    mention: "You were mentioned",
    review_requested: "Review requested",
    security_alert: "Security alert",
    state_change: "State changed",
    subscribed: "You're subscribed",
    team_mention: "Team mentioned",
  };
  return reasonMap[reason] || reason;
};

const getSubjectTypeIcon = (type: NotificationSubject["type"]): string => {
  const iconMap: Record<NotificationSubject["type"], string> = {
    Issue: "⚠️",
    PullRequest: "🔀",
    Commit: "💾",
    Release: "🚀",
    Discussion: "💬",
  };
  return iconMap[type] || "📝";
};

interface NotificationItemProps {
  notification: Notification;
  isSelected: boolean;
  isSelectionMode: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  isSelected,
  isSelectionMode,
  onPress,
  onLongPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      className={`px-4 py-4 border-b border-github-light-border-muted dark:border-github-dark-border-muted ${
        // Background color based on state
        notification.unread
          ? "bg-github-light-accent-subtle dark:bg-github-dark-accent-subtle"
          : "bg-github-light-canvas-default dark:bg-github-dark-canvas-overlay"
      } ${
        // Selection highlight
        isSelected
          ? "bg-github-light-accent-muted dark:bg-github-dark-accent-muted"
          : ""
      }`}
    >
      <View className="flex-row items-start space-x-3">
        {/* Selection indicator or unread dot */}
        <View className="w-3 h-3 mt-2 flex items-center justify-center">
          {isSelectionMode ? (
            // Selection checkbox
            <View
              className={`w-3 h-3 rounded-full border-2 ${
                isSelected
                  ? "bg-github-light-accent-emphasis dark:bg-github-dark-accent-emphasis border-github-light-accent-emphasis dark:border-github-dark-accent-emphasis"
                  : "border-github-light-border-default dark:border-github-dark-border-default"
              }`}
            />
          ) : notification.unread ? (
            // Unread indicator dot
            <View className="w-2 h-2 bg-github-light-accent-emphasis dark:bg-github-dark-accent-emphasis rounded-full" />
          ) : null}
        </View>

        {/* Notification content */}
        <View className="flex-1">
          {/* Repository name */}
          <Text className="text-sm font-medium text-github-light-fg-muted dark:text-github-dark-fg-muted mb-1">
            {notification.repository.full_name}
          </Text>

          {/* Subject title with icon */}
          <View className="flex-row items-center mb-1">
            <Text className="text-sm mr-2">
              {getSubjectTypeIcon(notification.subject.type)}
            </Text>
            <Text
              className={`flex-1 text-base ${
                // Bold text for unread notifications
                notification.unread
                  ? "font-semibold text-github-light-fg-default dark:text-github-dark-fg-default"
                  : "font-normal text-github-light-fg-muted dark:text-github-dark-fg-muted"
              }`}
            >
              {notification.subject.title}
            </Text>
          </View>

          {/* Reason and timestamp row */}
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-github-light-fg-muted dark:text-github-dark-fg-muted">
              {getReasonText(notification.reason)}
            </Text>
            <Text className="text-sm text-github-light-fg-muted dark:text-github-dark-fg-muted">
              {formatTimeAgo(notification.updated_at)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;
