// utils/contributionColors.ts
export const getContributionLevelColor = (
  level: number,
  tertiaryColor: string,
  isFuture: boolean = false
): string => {
  if (isFuture) return "#6B7280"; // Gray for future days

  const levelColors = {
    0: "#E5E7EB", // Light gray for no contributions
    1: "#22C55E", // Light green for 1 repo
    2: "#16A34A", // Medium green for 3-5 repos
    3: "#15803D", // Dark green for 6+ repos
  };
  return levelColors[level as keyof typeof levelColors] || levelColors[0];
};

export const getContributionLevelBorderColor = (
  level: number,
  tertiaryColor: string,
  isFuture: boolean = false
): string => {
  if (isFuture) return "#6B7280"; // Gray border for future days

  const borderColors = {
    0: "#E5E7EB", // Light gray border
    1: "#22C55E", // Light green border
    2: "#16A34A", // Medium green border
    3: "#15803D", // Dark green border
  };
  return borderColors[level as keyof typeof borderColors] || borderColors[0];
};
