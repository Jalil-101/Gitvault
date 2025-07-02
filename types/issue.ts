// types/issue.ts
export interface Issue {
  id: number;
  number: number;
  title: string;
  body?: string;
  state: 'open' | 'closed';
  user: {
    login: string;
    avatar_url: string;
  };
  labels: Label[];
  assignees: Assignee[];
  created_at: string;
  updated_at: string;
  comments: number;
  repository?: {
    name: string;
    full_name: string;
  };
}

export interface Label {
  id: number;
  name: string;
  color: string;
  description?: string;
}

export interface Assignee {
  login: string;
  avatar_url: string;
}

export type IssueFilter = 'all' | 'open' | 'closed' | 'assigned' | 'created';
export type IssueSortBy = 'created' | 'updated' | 'comments';