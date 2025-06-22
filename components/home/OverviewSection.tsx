import React from "react";
import { View, Text, Dimensions } from "react-native";
import StatsCard from "./StatsCard";
import { FileText, GitCommit, AlertCircle, Star } from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { CardColorType } from "@/constants/Colors";

const { width } = Dimensions.get("window");

import { LucideProps } from "lucide-react-native"; // Ensure to import LucideProps

interface StatsData {
  id: string;
  icon: React.ForwardRefExoticComponent<LucideProps>; // Use LucideProps for icon type
  value: string;
  label: string;
  colorType: CardColorType;
}

const statsData: StatsData[] = [
  {
    id: "repositories",
    icon: FileText,
    value: "47",
    label: "Repositories",
    colorType: "repositories",
  },
  {
    id: "commits",
    icon: GitCommit,
    value: "1.2k",
    label: "Commits",
    colorType: "commits",
  },
  {
    id: "issues",
    icon: AlertCircle,
    value: "23",
    label: "Issues",
    colorType: "issues",
  },
  {
    id: "stars",
    icon: Star,
    value: "456",
    label: "Stars",
    colorType: "stars",
  },
];

export default function OverviewSection() {
  const { colors } = useModernTheme();

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
