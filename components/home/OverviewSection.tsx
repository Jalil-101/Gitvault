import React from "react";
import { View, Text, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import StatsCard from "./StatsCard";
import {
  FileText,
  GitCommit,
  AlertCircle,
  Star,
  ClipboardCheck,
} from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { CardColorType } from "@/constants/Colors";

const { width } = Dimensions.get("window");

import { LucideIcon } from "lucide-react-native";

type ValidRoutes =
  | "/repository/RepositoryListScreen"
  | "/screens/CommitsScreen"
  | "/screens/Todo"
  | "/screens/StarsScreen";

interface StatsData {
  id: string;
  icon: LucideIcon;
  value: string;
  label: string;
  colorType: CardColorType;
  route: ValidRoutes; // Change to ValidRoutes to match the expected type
}

const statsData: StatsData[] = [
  {
    id: "repositories",
    icon: FileText,
    value: "47",
    label: "Repositories",
    colorType: "repositories",
    route: "/repository/RepositoryListScreen", // Navigate to repositories screen
  },
  {
    id: "commits",
    icon: GitCommit,
    value: "1.2k",
    label: "Commits",
    colorType: "commits",
    route: "/screens/CommitsScreen", // Navigate to commits screen
  },
  {
    id: "issues",
    icon: ClipboardCheck,
    value: "23",
    label: "Tasks",
    colorType: "issues",
    route: "/screens/Todo", // Navigate to tasks screen
  },
  {
    id: "stars",
    icon: Star,
    value: "456",
    label: "Stars",
    colorType: "stars",
    route: "/screens/StarsScreen", // Navigate to stars screen
  },
];

export default function OverviewSection() {
  const { colors } = useModernTheme();
  const router = useRouter();

  type ValidRoutes =
    | "/repository/RepositoryListScreen"
    | "/screens/CommitsScreen"
    | "/screens/Todo"
    | "/screens/StarsScreen";
  
  const handleStatPress = (route: ValidRoutes) => {
      router.push(route as any); // Cast to 'any' to bypass type checking
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
}
