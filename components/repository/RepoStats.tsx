// components/RepoStats.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Repository } from "@/types/repo";
import { useModernTheme } from "@/context/ThemeContext";
import { useThemeClasses } from "@/hooks/useThemeColor";

interface RepoStatsProps {
  repository: Repository;
}

export const RepoStats: React.FC<RepoStatsProps> = ({ repository }) => {
  const { colors } = useModernTheme();
  const themeClasses = useThemeClasses();

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const stats = [
    { icon: "⭐", label: "Stars", value: formatNumber(repository.stars) },
    { icon: "🍴", label: "Forks", value: formatNumber(repository.forks) },
    {
      icon: "👀",
      label: "Watchers",
      value: formatNumber(repository.watchers || 0),
    },
    {
      icon: "🐛",
      label: "Issues",
      value: formatNumber(repository.openIssues || 0),
    },
    {
      icon: "👥",
      label: "Contributors",
      value: formatNumber(repository.contributors || 0),
    },
    {
      icon: "📦",
      label: "Releases",
      value: formatNumber(repository.releases || 0),
    },
  ];

  return (
    <View className="px-4 mb-6">
      <Text
        className={`${themeClasses.text.primary} text-lg font-semibold mb-4`}
      >
        Statistics
      </Text>

      <View className="flex-row flex-wrap justify-between">
        {stats.map((stat, index) => (
          <TouchableOpacity
            key={index}
            className={`w-[48%] mb-3 p-4 rounded-xl ${themeClasses.surface.elevated}`}
            style={{ shadowColor: colors.shadow.md, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 }}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-2xl mb-1">{stat.icon}</Text>
                <Text className={`${themeClasses.text.tertiary} text-sm`}>
                  {stat.label}
                </Text>
              </View>
              <Text
                className={`${themeClasses.text.primary} text-xl font-bold`}
              >
                {stat.value}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
