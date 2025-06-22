// utils/contributionColors.ts
export const getContributionLevelColor = (
  level: number,
  tertiaryColor: string
): string => {
  const levelColors = {
    0: `${tertiaryColor}15`,
    1: "#22C55E20", // Light green
    2: "#22C55E40", // Medium green
    3: "#22C55E99",
    4: "#15803D",
  };
  return levelColors[level as keyof typeof levelColors];
};

export const getContributionLevelBorderColor = (
  level: number,
  tertiaryColor: string
): string => {
  const borderColors = {
    0: `${tertiaryColor}20`,
    1: "#22C55E30",
    2: "#22C55E50",
    3: "#22C55E99",
    4: "#15803D",
  };
  return borderColors[level as keyof typeof borderColors];
};
