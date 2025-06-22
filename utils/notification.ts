import { NotificationType, NotificationData, NotificationFilter } from "@/types/notification";

export const getNotificationIcon = (type: NotificationType): string => {
  const iconMap: Record<NotificationType, string> = {
    pull_request: "git-pull-request",
    issue: "alert-circle",
    push: "git-commit",
    star: "star",
    fork: "git-branch",
    release: "cube",
    mention: "at-circle",
    review_requested: "eye",
    discussion: "chatbubble-ellipses",
  };
  return iconMap[type] || "notifications";
};

export const getNotificationColor = (type: NotificationType): string => {
  const colorMap: Record<NotificationType, string> = {
    pull_request: "blue",
    issue: "orange",
    push: "green",
    star: "red",
    fork: "purple",
    release: "indigo",
    mention: "blue",
    review_requested: "orange",
    discussion: "green",
  };
  return colorMap[type] || "blue";
};

export const getNotificationTitle = (
  notification: NotificationData
): string => {
  const { type, author, metadata, title } = notification;

  switch (type) {
    case "pull_request":
      return metadata?.pullRequestNumber
        ? `New pull request #${metadata.pullRequestNumber} by ${author}`
        : `${author} opened a pull request`;
    case "issue":
      return metadata?.issueNumber
        ? `New issue #${metadata.issueNumber} by ${author}`
        : `${author} opened an issue`;
    case "push":
      return metadata?.commitMessage
        ? `${author}: ${metadata.commitMessage}`
        : `New commits pushed by ${author}`;
    case "star":
      return `${author} starred your repository`;
    case "fork":
      return `${author} forked your repository`;
    case "release":
      return metadata?.releaseTag
        ? `New release ${metadata.releaseTag} by ${author}`
        : `New release by ${author}`;
    case "mention":
      return `${author} mentioned you`;
    case "review_requested":
      return `${author} requested your review`;
    case "discussion":
      return metadata?.discussionTitle
        ? `${author} started "${metadata.discussionTitle}"`
        : `${author} started a discussion`;
    default:
      return title;
  }
};

export const formatNotificationTime = (timestamp: string | Date): string => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInMinutes = Math.floor(
    (now.getTime() - time.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks}w ago`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}y ago`;
};

export const groupNotificationsByDate = (notifications: NotificationData[]) => {
  const groups: { [key: string]: NotificationData[] } = {};

  notifications.forEach((notification) => {
    const date = new Date(notification.time);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let groupKey: string;

    if (date.toDateString() === today.toDateString()) {
      groupKey = "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      groupKey = "Yesterday";
    } else {
      const daysDiff = Math.floor(
        (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysDiff < 7) {
        groupKey = date.toLocaleDateString("en-US", { weekday: "long" });
      } else {
        groupKey = date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        });
      }
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }

    groups[groupKey].push(notification);
  });

  return groups;
};

export const filterNotificationsByType = (
  notifications: NotificationData[],
  types: NotificationType[]
): NotificationData[] => {
  if (types.length === 0) return notifications;
  return notifications.filter((notification) =>
    types.includes(notification.type)
  );
};

export const filterNotificationsByReadStatus = (
  notifications: NotificationData[],
  showOnlyUnread: boolean = false
): NotificationData[] => {
  if (!showOnlyUnread) return notifications;
  return notifications.filter((notification) => !notification.isRead);
};

export const filterParticipatingNotifications = (
  notifications: NotificationData[]
): NotificationData[] => {
  const participatingTypes: NotificationType[] = [
    "pull_request",
    "issue",
    "review_requested",
    "mention",
  ];
  return notifications.filter((notification) =>
    participatingTypes.includes(notification.type)
  );
};

export const filterMentionNotifications = (
  notifications: NotificationData[]
): NotificationData[] => {
  return notifications.filter(
    (notification) =>
      notification.type === "mention" || notification.isImportant
  );
};

export const sortNotificationsByPriority = (
  notifications: NotificationData[]
): NotificationData[] => {
  const priorityOrder: Record<NotificationType, number> = {
    mention: 1,
    review_requested: 2,
    pull_request: 3,
    issue: 4,
    push: 5,
    discussion: 6,
    release: 7,
    star: 8,
    fork: 9,
  };

  return [...notifications].sort((a, b) => {
    // First, sort by importance
    if (a.isImportant && !b.isImportant) return -1;
    if (!a.isImportant && b.isImportant) return 1;

    // Then by read status (unread first)
    if (!a.isRead && b.isRead) return -1;
    if (a.isRead && !b.isRead) return 1;

    // Then by priority
    const aPriority = priorityOrder[a.type] || 10;
    const bPriority = priorityOrder[b.type] || 10;
    if (aPriority !== bPriority) return aPriority - bPriority;

    // Finally by time (newest first)
    return new Date(b.time).getTime() - new Date(a.time).getTime();
  });
};

export const getUnreadCount = (notifications: NotificationData[]): number => {
  return notifications.filter((notification) => !notification.isRead).length;
};

export const getParticipatingCount = (
  notifications: NotificationData[]
): number => {
  return filterParticipatingNotifications(notifications).length;
};

export const getMentionsCount = (notifications: NotificationData[]): number => {
  return filterMentionNotifications(notifications).length;
};

export const markNotificationAsRead = (
  notifications: NotificationData[],
  notificationId: string
): NotificationData[] => {
  return notifications.map((notification) =>
    notification.id === notificationId
      ? { ...notification, isRead: true }
      : notification
  );
};

export const markAllNotificationsAsRead = (
  notifications: NotificationData[]
): NotificationData[] => {
  return notifications.map((notification) => ({
    ...notification,
    isRead: true,
  }));
};

export const toggleNotificationImportance = (
  notifications: NotificationData[],
  notificationId: string
): NotificationData[] => {
  return notifications.map((notification) =>
    notification.id === notificationId
      ? { ...notification, isImportant: !notification.isImportant }
      : notification
  );
};

// Helper function to generate notification filters with counts
export const generateNotificationFilters = (
  notifications: NotificationData[]
): NotificationFilter[] => {
  const unreadCount = getUnreadCount(notifications);
  const participatingCount = getParticipatingCount(notifications);
  const mentionsCount = getMentionsCount(notifications);

  return [
    {
      key: "all",
      label: "All",
      count: notifications.length,
      icon: "notifications",
    },
    {
      key: "unread",
      label: "Unread",
      count: unreadCount,
      icon: "notifications-circle",
    },
    {
      key: "participating",
      label: "Participating",
      count: participatingCount,
      icon: "person-circle",
    },
    {
      key: "mentions",
      label: "Mentions",
      count: mentionsCount,
      icon: "at-circle",
    },
  ];
};
