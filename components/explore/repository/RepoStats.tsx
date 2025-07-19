// components/RepoStats.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Repository, DetailConfig } from "@/types/repository";
import { useModernTheme } from "@/context/ThemeContext";

interface RepoStatsProps {
  repository: Repository;
  config: DetailConfig;
}

export const RepoStats: React.FC<RepoStatsProps> = ({ repository, config }) => {
  const { colors } = useModernTheme();

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const formatSize = (bytes: number): string => {
    if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${bytes} B`;
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
        className="text-lg font-semibold mb-4"
        style={{ color: colors.text.primary }}
      >
        Statistics
      </Text>

      <View className="flex-row flex-wrap justify-between">
        {stats.map((stat, index) => (
          <TouchableOpacity
            key={index}
            className="w-[48%] mb-3 p-4 rounded-xl"
            style={{ backgroundColor: config.colorScheme.cardBackground }}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-2xl mb-1">{stat.icon}</Text>
                <Text
                  className="text-sm"
                  style={{ color: colors.text.tertiary }}
                >
                  {stat.label}
                </Text>
              </View>
              <Text
                className="text-xl font-bold"
                style={{ color: config.colorScheme.primary }}
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
