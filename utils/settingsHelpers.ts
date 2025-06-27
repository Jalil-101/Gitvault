// utils/settingsHelpers.ts
import { UserStats } from "../types/settings";

export const formatStatValue = (value: number): string => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + "K";
  }
  return value.toString();
};

export const getStatIcon = (statType: keyof UserStats): string => {
  const iconMap = {
    repositories: "folder-outline",
    followers: "people-outline",
    following: "person-add-outline",
    stars: "star-outline",
    commits: "git-commit-outline",
    issues: "bug-outline",
    pullRequests: "git-pull-request-outline",
  };
  return iconMap[statType];
};

export const getStatColor = (
  statType: keyof UserStats,
  colors: any
): string => {
  const colorMap = {
    repositories: colors.accents.purple.main,
    followers: colors.accents.blue.main,
    following: colors.accents.green.main,
    stars: colors.accents.orange.main,
    commits: colors.accents.indigo.main,
    issues: colors.accents.red.main,
    pullRequests: colors.status.info.main,
  };
  return colorMap[statType];
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
