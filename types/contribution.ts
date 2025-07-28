// types/contribution.ts
export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3; // Updated to match new system
}

export interface ContributionGraphProps {
  contributions?: ContributionDay[];
  totalContributions?: number;
  currentStreak?: number;
  longestStreak?: number;
}
