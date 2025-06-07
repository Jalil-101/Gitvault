// types/github.ts
export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  topics: string[];
}

export interface User {
  id: number;
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface SearchFilters {
  type: "repositories" | "users" | "code" | "issues";
  sort:
    | "best-match"
    | "stars"
    | "forks"
    | "updated"
    | "repositories"
    | "followers";
  order: "desc" | "asc";
  language?: string;
}
