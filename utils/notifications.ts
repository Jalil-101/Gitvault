import type { Notification, NotificationSubject } from "@/types/notifications";

export const formatTimeAgo = (dateString: string): string => {
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

export const getReasonText = (reason: Notification["reason"]): string => {
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

export const getSubjectTypeIcon = (
  type: NotificationSubject["type"]
): string => {
  const iconMap: Record<NotificationSubject["type"], string> = {
    Issue: "⚠️",
    PullRequest: "🔀",
    Commit: "💾",
    Release: "🚀",
    Discussion: "💬",
  };
  return iconMap[type] || "📝";
};
