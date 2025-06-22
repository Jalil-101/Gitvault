// types/notifications.ts
export interface NotificationData {
  id: string;
  type: NotificationType;
  title: string;
  repository: string;
  author: string;
  time: string;
  isRead: boolean;
  isImportant?: boolean;
  avatar?: string;
  url?: string;
  metadata?: NotificationMetadata;
}

export type NotificationType =
  | "pull_request"
  | "issue"
  | "push"
  | "star"
  | "fork"
  | "release"
  | "mention"
  | "review_requested"
  | "discussion";

export interface NotificationMetadata {
  pullRequestNumber?: number;
  issueNumber?: string;
  commitSha?: string;
  releaseTag?: string;
  discussionTitle?: string;
  reviewState?: "approved" | "changes_requested" | "commented";
  branchName?: string;
  commitMessage?: string;
}

export interface NotificationFilter {
  key: string;
  label: string;
  count: number;
  icon: string;
}

export interface NotificationSettings {
  pushEnabled: boolean;
  emailEnabled: boolean;
  types: {
    [K in NotificationType]: boolean;
  };
  quietHours?: {
    enabled: boolean;
    start: string; // HH:mm format
    end: string; // HH:mm format
  };
  autoMarkAsRead?: boolean;
  groupByRepository?: boolean;
}
