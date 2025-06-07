// types/index.ts
export interface User {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description?: string;
  private: boolean;
  html_url: string;
  stargazers_count: number;
  language?: string;
  updated_at: string;
  created_at: string;
  owner: User;
}

export interface Issue {
  id: number;
  number: number;
  title: string;
  body?: string;
  state: "open" | "closed";
  user: User;
  repository: Repository;
  created_at: string;
  updated_at: string;
  html_url: string;
}

export interface PullRequest {
  id: number;
  number: number;
  title: string;
  body?: string;
  state: "open" | "closed" | "merged";
  user: User;
  repository: Repository;
  created_at: string;
  updated_at: string;
  merged_at?: string;
  html_url: string;
}

export type FeedItemType = "repository" | "issue" | "pull_request";

export interface FeedItem {
  id: string;
  type: FeedItemType;
  data: Repository | Issue | PullRequest;
  timestamp: string;
}

// Helper type guards
export function isRepository(data: any): data is Repository {
  return data && typeof data.stargazers_count === "number";
}

export function isIssue(data: any): data is Issue {
  return (
    data && data.state && !data.merged_at && typeof data.number === "number"
  );
}

export function isPullRequest(data: any): data is PullRequest {
  return (
    data &&
    data.state &&
    data.merged_at !== undefined &&
    typeof data.number === "number"
  );
}
