// utils/contributionData.ts
import { ContributionDay } from "@/types/contribution";

export const generateMockContributions = (): ContributionDay[] => {
  const contributions: ContributionDay[] = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const random = Math.random();
    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (random > 0.35) {
      if (random > 0.92) {
        count = Math.floor(Math.random() * 12) + 8;
        level = 4;
      } else if (random > 0.75) {
        count = Math.floor(Math.random() * 6) + 4;
        level = 3;
      } else if (random > 0.55) {
        count = Math.floor(Math.random() * 3) + 2;
        level = 2;
      } else {
        count = 1;
        level = 1;
      }
    }

    contributions.push({
      date: date.toISOString().split("T")[0],
      count,
      level,
    });
  }

  return contributions;
};

export const groupContributionsByMonth = (contributions: ContributionDay[]) => {
  const months: { [key: string]: ContributionDay[] } = {};

  contributions.forEach((day) => {
    const date = new Date(day.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

    if (!months[monthKey]) {
      months[monthKey] = [];
    }
    months[monthKey].push(day);
  });

  return Object.values(months);
};
