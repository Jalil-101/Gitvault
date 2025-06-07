export interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  isPrivate: boolean;
  updatedAt: string;
}

export interface UserProfile {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
  publicRepos: number;
  location: string;
  company: string;
  website: string;
  joinedDate: string;
  contributions: number;
}

export type TabType = "repositories" | "stars" | "projects";
