// types/repo.ts (updated)
export interface Repository {
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



export interface ListingConfig {
  type: "trending" | "discover";
  title: string;
  subtitle: string;
  accentColor: "purple" | "green" | "orange" | "red" | "blue" | "indigo";
}
