// types/commits.ts
export interface Commit {
  id: string;
  message: string;
  author: string;
  avatar: string;
  date: string;
  sha: string;
  additions: number;
  deletions: number;
}

export interface CommitsHeaderProps {
  navigation: any;
  selectedBranch: string;
  onBranchPress: () => void;
}

export interface CommitStatsProps {
  additions: number;
  deletions: number;
}

export interface CommitAuthorInfoProps {
  avatar: string;
  author: string;
  date: string;
}

export interface CommitShaInfoProps {
  sha: string;
  additions: number;
  deletions: number;
}

export interface CommitItemProps {
  commit: Commit;
  onPress: () => void;
}
