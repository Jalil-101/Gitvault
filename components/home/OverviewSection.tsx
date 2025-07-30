import { CardColorType } from "@/constants/Colors";
import { useModernTheme } from "@/context/ThemeContext";
import { dashboardService, DashboardStats } from "@/services/dashboardService";
import { useCommitsStore } from "@/store/commitsStore";
import { useStarsStore } from "@/store/starsStore";
import { useTodoStore } from "@/store/todoStore";
import { useRouter } from "expo-router";
import { ClipboardCheck, FileText, GitCommit, Star } from "lucide-react-native";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import StatsCard from "./StatsCard";

const { width } = Dimensions.get("window");

import { LucideIcon } from "lucide-react-native";

type ValidRoutes =
  | "/repository/RepositoryScreen"
  | "/screens/CommitsScreen"
  | "/screens/Todo"
  | "/screens/StarsScreen";

interface StatsData {
  id: string;
  icon: LucideIcon;
  value: string;
  label: string;
  colorType: CardColorType;
  route: ValidRoutes;
}

export interface OverviewSectionRef {
  fetchDashboardStats: () => Promise<void>;
}

const OverviewSection = forwardRef<OverviewSectionRef>((props, ref) => {
  const { colors } = useModernTheme();
  const router = useRouter();
  const { todos } = useTodoStore();
  const { privateCommits } = useCommitsStore();
  const { starredRepositories } = useStarsStore();
  const [stats, setStats] = useState<DashboardStats>({
    repositories: 0,
    commits: 0,
    tasks: 0,
    stars: 0,
    recentRepositories: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const dashboardStats = await dashboardService.getDashboardStats();
      // Update tasks count with real-time todo count
      dashboardStats.tasks = todos.length;
      // Update commits count with real-time private commits count
      dashboardStats.commits = privateCommits.length;
      // Update stars count with real-time starred repositories count
      dashboardStats.stars = starredRepositories.length;
      setStats(dashboardStats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  // Expose fetchDashboardStats via ref
  useImperativeHandle(ref, () => ({
    fetchDashboardStats,
  }));

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // Update stats when todos, commits, or stars change
  useEffect(() => {
    setStats((prevStats) => ({
      ...prevStats,
      tasks: todos.length,
      commits: privateCommits.length,
      stars: starredRepositories.length,
    }));
  }, [todos, privateCommits, starredRepositories]);

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  const statsData: StatsData[] = [
    {
      id: "repositories",
      icon: FileText,
      value: loading ? "..." : formatNumber(stats.repositories),
      label: "Repositories",
      colorType: "repositories",
      route: "/repository/RepositoryScreen",
    },
    {
      id: "commits",
      icon: GitCommit,
      value: loading ? "..." : formatNumber(stats.commits),
      label: "Commits",
      colorType: "commits",
      route: "/screens/CommitsScreen",
    },
    {
      id: "issues",
      icon: ClipboardCheck,
      value: loading ? "..." : formatNumber(stats.tasks),
      label: "Tasks",
      colorType: "issues",
      route: "/screens/Todo",
    },
    {
      id: "stars",
      icon: Star,
      value: loading ? "..." : formatNumber(stats.stars),
      label: "Stars",
      colorType: "stars",
      route: "/screens/StarsScreen",
    },
  ];

  const handleStatPress = (route: ValidRoutes) => {
    router.push(route as any);
  };

  return (
    <View className="px-5 mb-8">
      <Text
        className="text-2xl font-bold mb-4"
        style={{
          color: colors.text.primary,
          letterSpacing: -0.5,
        }}
      >
        Overview
      </Text>

      <View className="flex-row flex-wrap justify-between">
        {statsData.map((stat, index) => (
          <StatsCard
            key={stat.id}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
            colorType={stat.colorType}
            onPress={() => handleStatPress(stat.route)}
            style={{
              width: (width - 52) / 2,
              marginBottom: 12,
            }}
          />
        ))}
      </View>
    </View>
  );
});

export default OverviewSection;
