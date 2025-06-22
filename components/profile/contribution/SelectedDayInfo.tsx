// components/explore/SelectedDayInfo.tsx
import React from "react";
import { View, Text } from "react-native";
import { GitCommit } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ContributionDay } from "@/types/contribution";

interface SelectedDayInfoProps {
  selectedDay: ContributionDay;
  colors: any;
  shadows: any;
}

export const SelectedDayInfo: React.FC<SelectedDayInfoProps> = ({
  selectedDay,
  colors,
  shadows,
}) => {
  return (
    <View
      className="mx-5 mt-4 p-4 rounded-2xl"
      style={{
        backgroundColor: colors.surface.secondary,
        borderWidth: 1,
        borderColor: "#3B82F630",
        ...shadows.sm,
      }}
    >
      <LinearGradient
        colors={["#3B82F608", "#2563EB08"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-2xl"
      />
      <View className="flex-row items-center">
        <GitCommit size={16} color="#3B82F6" />
        <Text
          className="text-sm font-semibold ml-2"
          style={{ color: colors.text.primary }}
        >
          {selectedDay.count} contribution
          {selectedDay.count !== 1 ? "s" : ""}
        </Text>
        <Text
          className="text-sm font-medium ml-2"
          style={{ color: colors.text.secondary }}
        >
          on{" "}
          {new Date(selectedDay.date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>
    </View>
  );
};
