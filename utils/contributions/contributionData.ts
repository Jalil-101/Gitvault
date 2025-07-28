// utils/contributionData.ts
import { ContributionDay } from "@/types/contribution";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface RepositoryCreation {
  id: string;
  repositoryId: string;
  repositoryName: string;
  createdAt: Date;
}

export interface ContributionStats {
  currentStreak: number;
  longestStreak: number;
  totalContributions: number;
  lastContributionDate: Date | null;
}

// Storage keys
const REPOSITORY_CREATIONS_KEY = "repository_creations";
const CONTRIBUTION_STATS_KEY = "contribution_stats";

// Contribution levels based on repository count per day
export const getContributionLevel = (count: number): 0 | 1 | 2 | 3 => {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count >= 3 && count < 6) return 2;
  if (count >= 6) return 3;
  return 0;
};

// Get contribution color based on level
export const getContributionColor = (
  level: number,
  isFuture: boolean = false
): string => {
  if (isFuture) return "#6B7280"; // Gray for future days

  const colors = {
    0: "#E5E7EB", // Light gray for no contributions
    1: "#22C55E", // Light green for 1 repo
    2: "#16A34A", // Medium green for 3-5 repos
    3: "#15803D", // Dark green for 6+ repos
  };
  return colors[level as keyof typeof colors] || colors[0];
};

// Calculate streak based on repository creation logic
export const calculateStreak = (
  creations: RepositoryCreation[]
): ContributionStats => {
  if (creations.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalContributions: 0,
      lastContributionDate: null,
    };
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Group creations by date
  const creationsByDate = new Map<string, RepositoryCreation[]>();
  creations.forEach((creation) => {
    const dateKey = creation.createdAt.toISOString().split("T")[0];
    if (!creationsByDate.has(dateKey)) {
      creationsByDate.set(dateKey, []);
    }
    creationsByDate.get(dateKey)!.push(creation);
  });

  // Calculate current streak
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let lastContributionDate: Date | null = null;

  // Sort dates in descending order
  const sortedDates = Array.from(creationsByDate.keys()).sort().reverse();

  for (const dateKey of sortedDates) {
    const date = new Date(dateKey);
    const creationsOnDate = creationsByDate.get(dateKey)!;

    // Check if this date has any repository creations
    if (creationsOnDate.length > 0) {
      lastContributionDate = date;

      // If this is today or yesterday, continue the streak
      if (date >= yesterday) {
        tempStreak++;
        if (date >= today) {
          currentStreak = tempStreak;
        }
      } else {
        // If more than 24 hours have passed, reset streak
        const hoursDiff = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
        if (hoursDiff > 24) {
          tempStreak = 1; // Start new streak
        } else {
          tempStreak++;
        }
      }

      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      // No contributions on this date, reset streak
      tempStreak = 0;
    }
  }

  return {
    currentStreak,
    longestStreak,
    totalContributions: creations.length,
    lastContributionDate,
  };
};

// Generate contribution data for the current month and future months
export const generateContributionData = async (): Promise<
  ContributionDay[]
> => {
  try {
    // Get stored repository creations
    const storedCreations = await AsyncStorage.getItem(
      REPOSITORY_CREATIONS_KEY
    );
    const creations: RepositoryCreation[] = storedCreations
      ? JSON.parse(storedCreations).map((c: any) => ({
          ...c,
          createdAt: new Date(c.createdAt),
        }))
      : [];

    const contributions: ContributionDay[] = [];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Generate data for current month and next 3 months
    for (let monthOffset = 0; monthOffset <= 3; monthOffset++) {
      const month = (currentMonth + monthOffset) % 12;
      const year = currentYear + Math.floor((currentMonth + monthOffset) / 12);
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateKey = date.toISOString().split("T")[0];

        // Check if this date is in the future
        const isFuture = date > today;

        // Count repository creations for this date
        const creationsOnDate = creations.filter((creation) => {
          const creationDate = new Date(creation.createdAt);
          return creationDate.toISOString().split("T")[0] === dateKey;
        });

        const count = creationsOnDate.length;
        const level = isFuture ? 0 : getContributionLevel(count);

        contributions.push({
          date: dateKey,
          count,
          level,
        });
      }
    }

    return contributions;
  } catch (error) {
    console.error("Error generating contribution data:", error);
    return [];
  }
};

// Record a new repository creation
export const recordRepositoryCreation = async (
  repositoryId: string,
  repositoryName: string
): Promise<void> => {
  try {
    const creation: RepositoryCreation = {
      id: Date.now().toString(),
      repositoryId,
      repositoryName,
      createdAt: new Date(),
    };

    // Get existing creations
    const storedCreations = await AsyncStorage.getItem(
      REPOSITORY_CREATIONS_KEY
    );
    const existingCreations: RepositoryCreation[] = storedCreations
      ? JSON.parse(storedCreations).map((c: any) => ({
          ...c,
          createdAt: new Date(c.createdAt),
        }))
      : [];

    // Add new creation
    const updatedCreations = [...existingCreations, creation];

    // Store updated creations
    await AsyncStorage.setItem(
      REPOSITORY_CREATIONS_KEY,
      JSON.stringify(updatedCreations)
    );

    console.log("Repository creation recorded:", creation);
  } catch (error) {
    console.error("Error recording repository creation:", error);
  }
};

// Get contribution statistics
export const getContributionStats = async (): Promise<ContributionStats> => {
  try {
    const storedCreations = await AsyncStorage.getItem(
      REPOSITORY_CREATIONS_KEY
    );
    const creations: RepositoryCreation[] = storedCreations
      ? JSON.parse(storedCreations).map((c: any) => ({
          ...c,
          createdAt: new Date(c.createdAt),
        }))
      : [];

    return calculateStreak(creations);
  } catch (error) {
    console.error("Error getting contribution stats:", error);
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalContributions: 0,
      lastContributionDate: null,
    };
  }
};

// Group contributions by month (updated for future months)
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
