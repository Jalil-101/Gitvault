// components/settings/StatsCard.tsx
import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useModernThemeColor } from "../../hooks/useThemeColor";

interface StatItem {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

interface StatsCardProps {
  stats: StatItem[];
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  const { surface, text } = useModernThemeColor();

  return (
    <View
      className="mx-4 mb-6 p-4 rounded-2xl"
      style={{ backgroundColor: surface.secondary }}
    >
      <View className="flex-row justify-between">
        {stats.map((stat, index) => (
          <View key={index} className="items-center flex-1">
            <View
              className="w-8 h-8 rounded-full items-center justify-center mb-2"
              style={{ backgroundColor: `${stat.color}20` }}
            >
              <Ionicons name={stat.icon} size={16} color={stat.color} />
            </View>
            <Text
              className="text-xl font-bold"
              style={{ color: text.primary }}
            >
              {stat.value}
            </Text>
            <Text
              className="text-xs"
              style={{ color: text.tertiary }}
            >
              {stat.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};