// types/search.ts
export interface FilterOption {
  id: string;
  label: string;
  active: boolean;
}

export interface SearchResult {
  id: string;
  type: "repository" | "user" | "topic";
  title: string;
  subtitle?: string;
  description?: string;
  language?: string;
  stars?: number;
  forks?: number;
  verified?: boolean;
}

export interface RecentSearch {
  id: string;
  query: string;
  timestamp: Date;
}

export interface SearchSuggestion {
  id: string;
  type: "trending" | "topic" | "user" | "repository";
  text: string;
  subtitle: string | undefined;
}
