// types/contribution.ts
export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionGraphProps {
  contributions?: ContributionDay[];
  totalContributions?: number;
  currentStreak?: number;
  longestStreak?: number;
}
