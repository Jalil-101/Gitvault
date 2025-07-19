// types/repository.ts - Unified Repository Types

// Base GitHub API response type (your existing implementation)
export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  private: boolean;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  clone_url: string;
  ssh_url: string;
  language: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  topics: string[];
  license?: {
    name: string;
    spdx_id: string;
  };
}

// Base repository interface (common properties)
export interface BaseRepository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  avatar: string;
  owner: string;
  updatedAt: string;
  isPrivate: boolean;
  topics: string[];
  url: string;
}

// Extended repository interface for detail views
export interface Repository extends BaseRepository {
  // Extended properties for detail view
  watchers?: number;
  openIssues?: number;
  license?: string;
  size?: number;
  defaultBranch?: string;
  createdAt?: string;
  pushedAt?: string;
  homepage?: string;
  contributors?: number;
  releases?: number;
  readme?: string;
  languages?: { [key: string]: number };
}

// Configuration for detail screens
export interface DetailConfig {
  type: "trending" | "discover";
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    cardBackground: string;
    textPrimary: string;
    textSecondary: string;
  };
}

// Type guards for runtime checking
export function isGitHubRepository(repo: any): repo is GitHubRepository {
  return typeof repo.id === "number" && typeof repo.full_name === "string";
}

export function isRepository(repo: any): repo is Repository {
  return typeof repo.id === "string" && typeof repo.fullName === "string";
}

// Utility function to convert GitHub API response to normalized Repository
export function normalizeGitHubRepository(
  githubRepo: GitHubRepository
): Repository {
  return {
    id: githubRepo.id.toString(),
    name: githubRepo.name,
    fullName: githubRepo.full_name,
    description: githubRepo.description || "",
    language: githubRepo.language || "",
    stars: githubRepo.stargazers_count,
    forks: githubRepo.forks_count,
    avatar: githubRepo.owner.avatar_url,
    owner: githubRepo.owner.login,
    updatedAt: githubRepo.updated_at,
    isPrivate: githubRepo.private,
    topics: githubRepo.topics,
    url: githubRepo.html_url,

    // Extended properties
    watchers: githubRepo.watchers_count,
    openIssues: githubRepo.open_issues_count,
    license: githubRepo.license?.name,
    size: githubRepo.size,
    defaultBranch: githubRepo.default_branch,
    createdAt: githubRepo.created_at,
    pushedAt: githubRepo.pushed_at,
  };
}

// Create base repository without optional detail properties
export function createBaseRepository(
  data: Partial<Repository>
): BaseRepository {
  return {
    id: data.id || "",
    name: data.name || "",
    fullName: data.fullName || "",
    description: data.description || "",
    language: data.language || "",
    stars: data.stars || 0,
    forks: data.forks || 0,
    avatar: data.avatar || "",
    owner: data.owner || "",
    updatedAt: data.updatedAt || "",
    isPrivate: data.isPrivate || false,
    topics: data.topics || [],
    url: data.url || "",
  };
}

// Utility function to convert normalized Repository back to GitHub format (if needed)
export function denormalizeToGitHub(
  repo: Repository
): Partial<GitHubRepository> {
  return {
    id: parseInt(repo.id),
    name: repo.name,
    full_name: repo.fullName,
    description: repo.description,
    private: repo.isPrivate,
    owner: {
      login: repo.owner,
      avatar_url: repo.avatar,
    },
    html_url: repo.url,
    language: repo.language,
    stargazers_count: repo.stars,
    watchers_count: repo.watchers || 0,
    forks_count: repo.forks,
    open_issues_count: repo.openIssues || 0,
    default_branch: repo.defaultBranch || "main",
    created_at: repo.createdAt || "",
    updated_at: repo.updatedAt,
    pushed_at: repo.pushedAt || "",
    size: repo.size || 0,
    topics: repo.topics,
    license: repo.license ? { name: repo.license, spdx_id: "" } : undefined,
  };
}

// SIMPLE APPROACH: Use these type aliases for easy migration
// Use this for ALL your existing screens - no changes needed
export type ExistingScreenRepository = GitHubRepository;

// Use this for ALL your new basic screens
export type NewScreenRepository = BaseRepository;

// Use this for ALL your new detailed screens
export type DetailedScreenRepository = Repository;

// Use this for configuration in new screens
export type ScreenConfig = DetailConfig;

// Export the main Repository as default for new implementations
export interface ListingConfig {
  type: "trending" | "discover";
  title: string;
  subtitle: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}
export default Repository;
