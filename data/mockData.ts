// data/mockData.ts
import { StatItem, ActivityItem, TrendingRepo, QuickAction } from "../types";

export const statsData: StatItem[] = [
  {
    label: "Repositories",
    value: "47",
    icon: "folder-outline",
    color: "#6366F1",
    gradient: ["#6366F1", "#8B5CF6"],
  },
  {
    label: "Commits",
    value: "1.2k",
    icon: "git-commit-outline",
    color: "#10B981",
    gradient: ["#10B981", "#06D6A0"],
  },
  {
    label: "Issues",
    value: "23",
    icon: "alert-circle-outline",
    color: "#F59E0B",
    gradient: ["#F59E0B", "#F97316"],
  },
  {
    label: "Stars",
    value: "456",
    icon: "star-outline",
    color: "#EF4444",
    gradient: ["#EF4444", "#F97316"],
  },
];

export const activityData: ActivityItem[] = [
  {
    id: 1,
    user: "alex_dev",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    action: "merged pull request #142",
    repo: "next-gen-ui",
    time: "2h",
    type: "merge",
    color: "#8B5CF6",
  },
  {
    id: 2,
    user: "sarah_code",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    action: "released v2.1.0",
    repo: "design-system",
    time: "4h",
    type: "release",
    color: "#10B981",
  },
  {
    id: 3,
    user: "mike_ui",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    action: "opened issue #89",
    repo: "mobile-components",
    time: "6h",
    type: "issue",
    color: "#F59E0B",
  },
];

export const trendingRepos: TrendingRepo[] = [
  {
    name: "neural-networks/transformer",
    description: "State-of-the-art transformer architecture implementation",
    language: "Python",
    stars: "12.8k",
    trend: "+2.3k",
    languageColor: "#3776AB",
    isHot: true,
  },
  {
    name: "web3/defi-protocol",
    description: "Decentralized finance protocol with yield farming",
    language: "Solidity",
    stars: "8.4k",
    trend: "+1.8k",
    languageColor: "#363636",
    isHot: false,
  },
];

export const quickActions: QuickAction[] = [
  { icon: "search", label: "Search", color: "#10B981" },
  { icon: "git-pull-request", label: "PRs", color: "#F59E0B" },
  { icon: "alert-circle", label: "Issues", color: "#EF4444" },
];
