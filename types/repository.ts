// // types/repository.ts - Unified Repository Types

// // Base GitHub API response type (your existing implementation)
// export interface GitHubRepository {
//   id: number;
//   name: string;
//   full_name: string;
//   description: string;
//   private: boolean;
//   owner: {
//     login: string;
//     avatar_url: string;
//   };
//   html_url: string;
//   clone_url: string;
//   ssh_url: string;
//   language: string;
//   stargazers_count: number;
//   watchers_count: number;
//   forks_count: number;
//   open_issues_count: number;
//   default_branch: string;
//   created_at: string;
//   updated_at: string;
//   pushed_at: string;
//   size: number;
//   topics: string[];
//   license?: {
//     name: string;
//     spdx_id: string;
//   };
// }

// // Base repository interface (common properties)
// export interface BaseRepository {
//   id: string;
//   name: string;
//   fullName: string;
//   description: string;
//   language: string;
//   stars: number;
//   forks: number;
//   avatar: string;
//   owner: string;
//   updatedAt: string;
//   isPrivate: boolean;
//   topics: string[];
//   url: string;
// }

// // Extended repository interface for detail views
// export interface Repository extends BaseRepository {
//   // Extended properties for detail view
//   watchers?: number;
//   openIssues?: number;
//   license?: string;
//   size?: number;
//   defaultBranch?: string;
//   createdAt?: string;
//   pushedAt?: string;
//   homepage?: string;
//   contributors?: number;
//   releases?: number;
//   readme?: string;
//   languages?: { [key: string]: number };
// }

// // Configuration for detail screens
// export interface DetailConfig {
//   type: "trending" | "discover";
//   colorScheme: {
//     primary: string;
//     secondary: string;
//     accent: string;
//     background: string;
//     cardBackground: string;
//     textPrimary: string;
//     textSecondary: string;
//   };
// }

// // Type guards for runtime checking
// export function isGitHubRepository(repo: any): repo is GitHubRepository {
//   return typeof repo.id === "number" && typeof repo.full_name === "string";
// }

// export function isRepository(repo: any): repo is Repository {
//   return typeof repo.id === "string" && typeof repo.fullName === "string";
// }

// // Utility function to convert GitHub API response to normalized Repository
// export function normalizeGitHubRepository(
//   githubRepo: GitHubRepository
// ): Repository {
//   return {
//     id: githubRepo.id.toString(),
//     name: githubRepo.name,
//     fullName: githubRepo.full_name,
//     description: githubRepo.description || "",
//     language: githubRepo.language || "",
//     stars: githubRepo.stargazers_count,
//     forks: githubRepo.forks_count,
//     avatar: githubRepo.owner.avatar_url,
//     owner: githubRepo.owner.login,
//     updatedAt: githubRepo.updated_at,
//     isPrivate: githubRepo.private,
//     topics: githubRepo.topics,
//     url: githubRepo.html_url,

//     // Extended properties
//     watchers: githubRepo.watchers_count,
//     openIssues: githubRepo.open_issues_count,
//     license: githubRepo.license?.name,
//     size: githubRepo.size,
//     defaultBranch: githubRepo.default_branch,
//     createdAt: githubRepo.created_at,
//     pushedAt: githubRepo.pushed_at,
//   };
// }

// // Create base repository without optional detail properties
// export function createBaseRepository(
//   data: Partial<Repository>
// ): BaseRepository {
//   return {
//     id: data.id || "",
//     name: data.name || "",
//     fullName: data.fullName || "",
//     description: data.description || "",
//     language: data.language || "",
//     stars: data.stars || 0,
//     forks: data.forks || 0,
//     avatar: data.avatar || "",
//     owner: data.owner || "",
//     updatedAt: data.updatedAt || "",
//     isPrivate: data.isPrivate || false,
//     topics: data.topics || [],
//     url: data.url || "",
//   };
// }

// // Utility function to convert normalized Repository back to GitHub format (if needed)
// export function denormalizeToGitHub(
//   repo: Repository
// ): Partial<GitHubRepository> {
//   return {
//     id: parseInt(repo.id),
//     name: repo.name,
//     full_name: repo.fullName,
//     description: repo.description,
//     private: repo.isPrivate,
//     owner: {
//       login: repo.owner,
//       avatar_url: repo.avatar,
//     },
//     html_url: repo.url,
//     language: repo.language,
//     stargazers_count: repo.stars,
//     watchers_count: repo.watchers || 0,
//     forks_count: repo.forks,
//     open_issues_count: repo.openIssues || 0,
//     default_branch: repo.defaultBranch || "main",
//     created_at: repo.createdAt || "",
//     updated_at: repo.updatedAt,
//     pushed_at: repo.pushedAt || "",
//     size: repo.size || 0,
//     topics: repo.topics,
//     license: repo.license ? { name: repo.license, spdx_id: "" } : undefined,
//   };
// }

// // SIMPLE APPROACH: Use these type aliases for easy migration
// // Use this for ALL your existing screens - no changes needed
// export type ExistingScreenRepository = GitHubRepository;

// // Use this for ALL your new basic screens
// export type NewScreenRepository = BaseRepository;

// // Use this for ALL your new detailed screens
// export type DetailedScreenRepository = Repository;

// // Use this for configuration in new screens
// export type ScreenConfig = DetailConfig;

// // Export the main Repository as default for new implementations
// export interface ListingConfig {
//   type: "trending" | "discover";
//   title: string;
//   subtitle: string;
//   colorScheme: {
//     primary: string;
//     secondary: string;
//     accent: string;
//     background: string;
//   };
// }
// export default Repository;
// types/repository.ts - Unified Repository Types

// =============================================================================
// ORIGINAL SIMPLE REPOSITORY TYPES (Document 1)
// Keep these for backward compatibility with existing code
// =============================================================================

// types/repository.ts - Unified Repository Types

// =============================================================================
// ORIGINAL SIMPLE REPOSITORY TYPES (Document 1)
// Keep these for backward compatibility with existing code
// =============================================================================

export interface SimpleRepository {
  id: number;
  name: string;
  description: string;
  isPrivate: boolean;
  createdAt?: string;
  updatedAt?: string;
  owner?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface CreateRepositoryData {
  name: string;
  description: string;
  isPrivate: boolean;
}

export interface UpdateRepositoryData {
  name?: string;
  description?: string;
  isPrivate?: boolean;
}

// =============================================================================
// GITHUB API TYPES (Document 2)
// Keep these for GitHub integration
// =============================================================================

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

// =============================================================================
// UNIFIED REPOSITORY INTERFACE
// This combines both approaches into a flexible system
// =============================================================================

// Base properties that all repositories should have
export interface BaseRepository {
  id: string | number; // Support both string and number IDs
  name: string;
  description: string;
  isPrivate: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Extended repository interface that includes both simple and GitHub properties
export interface Repository extends BaseRepository {
  // Original simple repository properties
  owner?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  
  // GitHub-specific properties (optional for backward compatibility)
  fullName?: string;
  language?: string;
  stars?: number;
  forks?: number;
  avatar?: string;
  ownerLogin?: string;
  topics?: string[];
  url?: string;
  watchers?: number;
  openIssues?: number;
  license?: string;
  size?: number;
  defaultBranch?: string;
  pushedAt?: string;
  homepage?: string;
  contributors?: number;
  releases?: number;
  readme?: string;
  languages?: { [key: string]: number };
}

// =============================================================================
// SPECIALIZED REPOSITORY TYPES
// Use these for specific use cases
// =============================================================================

// For screens that need rich GitHub data
export interface GitHubEnrichedRepository extends Required<Pick<Repository, 
  'id' | 'name' | 'description' | 'isPrivate' | 'fullName' | 'language' | 
  'stars' | 'forks' | 'avatar' | 'ownerLogin' | 'topics' | 'url' | 'updatedAt'
>> {
  // Make GitHub properties required for this type
  createdAt: string;
  watchers: number;
  openIssues: number;
  size: number;
  defaultBranch: string;
  pushedAt: string;
}

// For simple internal repositories
export interface InternalRepository extends Required<Pick<Repository,
  'id' | 'name' | 'description' | 'isPrivate'
>> {
  // Make owner required for internal repos
  owner: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

// =============================================================================
// CONFIGURATION TYPES
// =============================================================================

export interface DetailConfig {
  type: "trending" | "discover" | "internal";
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

export interface ListingConfig {
  type: "trending" | "discover" | "internal";
  title: string;
  subtitle: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

// =============================================================================
// TYPE GUARDS
// =============================================================================

export function isSimpleRepository(repo: any): repo is SimpleRepository {
  return typeof repo.id === "number" && 
         typeof repo.name === "string" && 
         typeof repo.isPrivate === "boolean" &&
         repo.owner?.firstName !== undefined;
}

export function isGitHubRepository(repo: any): repo is GitHubRepository {
  return typeof repo.id === "number" && 
         typeof repo.full_name === "string" &&
         repo.owner?.login !== undefined;
}

export function isInternalRepository(repo: any): repo is InternalRepository {
  return repo.owner?.firstName !== undefined;
}

export function isGitHubEnrichedRepository(repo: any): repo is GitHubEnrichedRepository {
  return repo.fullName !== undefined && 
         repo.ownerLogin !== undefined &&
         repo.stars !== undefined;
}

// =============================================================================
// CONVERSION UTILITIES
// =============================================================================

// Convert GitHub API response to unified Repository
export function normalizeGitHubRepository(githubRepo: GitHubRepository): Repository {
  return {
    id: githubRepo.id,
    name: githubRepo.name,
    description: githubRepo.description || "",
    isPrivate: githubRepo.private,
    createdAt: githubRepo.created_at,
    updatedAt: githubRepo.updated_at,
    
    // GitHub-specific properties
    fullName: githubRepo.full_name,
    language: githubRepo.language || "",
    stars: githubRepo.stargazers_count,
    forks: githubRepo.forks_count,
    avatar: githubRepo.owner.avatar_url,
    ownerLogin: githubRepo.owner.login,
    topics: githubRepo.topics,
    url: githubRepo.html_url,
    watchers: githubRepo.watchers_count,
    openIssues: githubRepo.open_issues_count,
    license: githubRepo.license?.name,
    size: githubRepo.size,
    defaultBranch: githubRepo.default_branch,
    pushedAt: githubRepo.pushed_at,
  };
}

// Convert simple repository to unified Repository
export function normalizeSimpleRepository(simpleRepo: SimpleRepository): Repository {
  return {
    id: simpleRepo.id,
    name: simpleRepo.name,
    description: simpleRepo.description,
    isPrivate: simpleRepo.isPrivate,
    createdAt: simpleRepo.createdAt,
    updatedAt: simpleRepo.updatedAt,
    owner: simpleRepo.owner,
  };
}

// Convert unified Repository back to simple format (for backward compatibility)
export function denormalizeToSimple(repo: Repository): SimpleRepository {
  return {
    id: typeof repo.id === 'string' ? parseInt(repo.id) : repo.id,
    name: repo.name,
    description: repo.description,
    isPrivate: repo.isPrivate,
    createdAt: repo.createdAt,
    updatedAt: repo.updatedAt,
    owner: repo.owner,
  };
}

// Convert unified Repository back to GitHub format
export function denormalizeToGitHub(repo: Repository): Partial<GitHubRepository> {
  const id = typeof repo.id === 'string' ? parseInt(repo.id) : repo.id;
  
  return {
    id,
    name: repo.name,
    full_name: repo.fullName || repo.name,
    description: repo.description,
    private: repo.isPrivate,
    owner: {
      login: repo.ownerLogin || '',
      avatar_url: repo.avatar || '',
    },
    html_url: repo.url || '',
    language: repo.language || '',
    stargazers_count: repo.stars || 0,
    watchers_count: repo.watchers || 0,
    forks_count: repo.forks || 0,
    open_issues_count: repo.openIssues || 0,
    default_branch: repo.defaultBranch || 'main',
    created_at: repo.createdAt || '',
    updated_at: repo.updatedAt || '',
    pushed_at: repo.pushedAt || '',
    size: repo.size || 0,
    topics: repo.topics || [],
    license: repo.license ? { name: repo.license, spdx_id: '' } : undefined,
    clone_url: '',
    ssh_url: '',
  };
}

// =============================================================================
// MIGRATION HELPERS
// Use these type aliases to gradually migrate your existing code
// =============================================================================

// For existing screens - no changes needed to your current code
export type LegacyRepository = SimpleRepository;

// For new GitHub-integrated screens
export type GitHubIntegratedRepository = GitHubEnrichedRepository;

// For internal repository management
export type ManagedRepository = InternalRepository;

// For flexible screens that can handle both
export type FlexibleRepository = Repository;

// =============================================================================
// EXPORTS
// =============================================================================

// Export the main Repository as default for new implementations
export default Repository;

// Keep original exports for backward compatibility
export type { SimpleRepository as Repository_v1 };