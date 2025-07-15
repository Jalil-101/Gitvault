import { useModernTheme } from "@/context/ThemeContext";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ActivityItem from "./ActivityItem";

const activityData = [
  {
    id: "1",
    title: "merged pull request #142",
    subtitle: "next-gen-ui",
    time: "2h",
    colorKey: "info" as const,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    user: "alex_dev",
  },
  {
    id: "2",
    title: "released v2.1.0",
    subtitle: "design-system",
    time: "4h",
    colorKey: "success" as const,
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    user: "sarah_code",
  },
  {
    id: "3",
    title: "opened issue #89",
    subtitle: "mobile-components",
    time: "6h",
    colorKey: "warning" as const,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    user: "mike_ui",
  },
];

export default function RecentActivitySection() {
  const { colors } = useModernTheme();

  return (
    <View className="px-5 mb-8">
      <View className="flex-row items-center justify-between mb-4">
        <Text
          className="text-2xl font-bold"
          style={{
            color: colors.text.primary,
            letterSpacing: -0.5,
          }}
        >
          Recent Activity
        </Text>

        <TouchableOpacity activeOpacity={0.7}>
          <Text
            className="text-sm font-semibold"
            style={{ color: colors.interactive.primary }}
          >
            View all
          </Text>
        </TouchableOpacity>
      </View>

      <View
        className="rounded-2xl p-1"
        style={{
          backgroundColor: colors.surface.glass,
          borderWidth: 1,
          borderColor: colors.border.glass,
        }}
      >
        {activityData.map((activity, index) => (
          <ActivityItem
            key={activity.id}
            title={activity.title}
            subtitle={activity.subtitle}
            time={activity.time}
            colorKey={activity.colorKey}
            isLast={index === activityData.length - 1}
            avatar={activity.avatar}
            user={activity.user}
          />
        ))}
      </View>
    </View>
  );
}
