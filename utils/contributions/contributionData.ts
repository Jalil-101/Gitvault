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
    // Get repository creations from storage
    const storedCreations = await AsyncStorage.getItem(
      REPOSITORY_CREATIONS_KEY
    );

    if (!storedCreations) {
      // New user - return null/empty data
      console.log("📊 New user detected - no contribution data");
      return [];
    }

    const repositoryCreations: RepositoryCreation[] = JSON.parse(
      storedCreations
    ).map((creation: any) => ({
      ...creation,
      createdAt: new Date(creation.createdAt),
    }));

    if (repositoryCreations.length === 0) {
      // User has no repository creations - return empty data
      console.log(
        "📊 User has no repository creations - empty contribution data"
      );
      return [];
    }

    // Generate contribution data for the last 365 days
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - 364); // 365 days total

    const contributions: ContributionDay[] = [];

    for (let i = 0; i < 365; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      // Check if this date is in the future
      const isFuture = currentDate > now;

      // Count repository creations for this date
      const creationsOnDate = repositoryCreations.filter((creation) => {
        const creationDate = new Date(creation.createdAt);
        return (
          creationDate.getFullYear() === currentDate.getFullYear() &&
          creationDate.getMonth() === currentDate.getMonth() &&
          creationDate.getDate() === currentDate.getDate()
        );
      });

      const contributionLevel = getContributionLevel(creationsOnDate.length);

      contributions.push({
        date: currentDate.toISOString().split("T")[0],
        count: creationsOnDate.length,
        level: contributionLevel,
        color: getContributionColor(contributionLevel, isFuture),
        isFuture,
      });
    }

    console.log(
      "📊 Generated contribution data for",
      contributions.length,
      "days"
    );
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
