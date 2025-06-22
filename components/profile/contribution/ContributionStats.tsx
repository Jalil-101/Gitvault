import React from "react";
import { View, Text } from "react-native";
import { Flame, Award } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ContributionStatsProps {
  currentStreak: number;
  longestStreak: number;
  colors: any;
  shadows: any;
}

export const ContributionStats: React.FC<ContributionStatsProps> = ({
  currentStreak,
  longestStreak,
  colors,
  shadows,
}) => {
  return (
    <View className="flex-row justify-between px-5 mb-6">
      <View
        className="flex-1 p-4 rounded-2xl mr-2"
        style={{
          backgroundColor: colors.surface.secondary,
          borderWidth: 1,
          borderColor: "#F9731630",
          ...shadows.sm,
        }}
      >
        <LinearGradient
          colors={["#F9731608", "#EA580C08"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="absolute inset-0 rounded-2xl"
        />
        <View className="flex-row items-center mb-2">
          <Flame size={16} color="#F97316" />
          <Text
            className="text-xs font-medium ml-2"
            style={{ color: colors.text.secondary }}
          >
            Current Streak
          </Text>
        </View>
        <Text
          className="text-xl font-bold"
          style={{ color: colors.text.primary }}
        >
          {currentStreak}
        </Text>
      </View>

      <View
        className="flex-1 p-4 rounded-2xl ml-2"
        style={{
          backgroundColor: colors.surface.secondary,
          borderWidth: 1,
          borderColor: "#8B5CF630",
          ...shadows.sm,
        }}
      >
        <LinearGradient
          colors={["#8B5CF608", "#A855F708"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="absolute inset-0 rounded-2xl"
        />
        <View className="flex-row items-center mb-2">
          <Award size={16} color="#8B5CF6" />
          <Text
            className="text-xs font-medium ml-2"
            style={{ color: colors.text.secondary }}
          >
            Longest Streak
          </Text>
        </View>
        <Text
          className="text-xl font-bold"
          style={{ color: colors.text.primary }}
        >
          {longestStreak}
        </Text>
      </View>
    </View>
  );
};
