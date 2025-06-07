export interface NotificationUser {
  login: string;
  avatar_url: string;
}

export interface NotificationRepository {
  name: string;
  full_name: string;
  owner: {
    login: string;
  };
}

export interface NotificationSubject {
  title: string;
  type: "Issue" | "PullRequest" | "Commit" | "Release" | "Discussion";
  url: string;
}

export interface Notification {
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

export type FilterType = "all" | "unread" | "participating";
