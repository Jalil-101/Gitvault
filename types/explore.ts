// types/explore.ts

export type ExploreTab = "repositories" | "developers" | "topics";

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  updated_at: string;
  homepage?: string;
  topics: string[];
}

export interface Developer {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: "User" | "Organization";
  name?: string;
  company?: string;
  location?: string;
  bio?: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface Topic {
  name: string;
  display_name: string;
  short_description: string;
  description?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  featured: boolean;
  curated: boolean;
  score?: number;
}
