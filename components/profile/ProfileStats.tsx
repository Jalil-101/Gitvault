// components/profile/ProfileStats.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { ProfileStats as ProfileStatsType } from "@/types/profile";

interface ProfileStatsProps {
  stats: ProfileStatsType;
  onStatPress?: (stat: string) => void;
}

interface StatItemProps {
  label: string;
  value: number;
  onPress?: () => void;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, onPress }) => {
  const { colors } = useModernTheme();

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 items-center py-4"
      disabled={!onPress}
    >
      <Text
        className="text-2xl font-bold mb-1"
        style={{ color: colors.text.primary }}
      >
        {formatNumber(value)}
      </Text>
      <Text className="text-sm" style={{ color: colors.text.secondary }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export const ProfileStats: React.FC<ProfileStatsProps> = ({
  stats,
  onStatPress,
}) => {
  const { colors } = useModernTheme();

  return (
    <View
      className="flex-row mx-6 mb-6 rounded-modern-lg border"
      style={{
        backgroundColor: colors.surface.secondary,
        borderColor: colors.border.primary,
      }}
    >
      <StatItem
        label="Repositories"
        value={stats.repositories}
        onPress={() => onStatPress?.("repositories")}
      />

      <View
        className="w-px h-16 self-center"
        style={{ backgroundColor: colors.border.primary }}
      />

      <StatItem
        label="Followers"
        value={stats.followers}
        onPress={() => onStatPress?.("followers")}
      />

      <View
        className="w-px h-16 self-center"
        style={{ backgroundColor: colors.border.primary }}
      />

      <StatItem
        label="Following"
        value={stats.following}
        onPress={() => onStatPress?.("following")}
      />

      <View
        className="w-px h-16 self-center"
        style={{ backgroundColor: colors.border.primary }}
      />

      <StatItem
        label="Stars"
        value={stats.totalStars}
        onPress={() => onStatPress?.("stars")}
      />
    </View>
  );
};
