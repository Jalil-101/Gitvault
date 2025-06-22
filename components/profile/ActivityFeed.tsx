// components/profile/ActivityFeed.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { GitCommit, Star, Eye, GitBranch } from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { Activity } from "@/types/profile";

interface ActivityFeedProps {
  activities: Activity[];
  onViewAll: () => void;
}

interface ActivityItemProps {
  activity: Activity;
  showDivider: boolean;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  activity,
  showDivider,
}) => {
  const { colors } = useModernTheme();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "commit":
        return GitCommit;
      case "star":
        return Star;
      case "watch":
        return Eye;
      case "fork":
        return GitBranch;
      default:
        return GitCommit;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "commit":
        return colors.accents.green.main;
      case "star":
        return colors.accents.orange.main;
      case "watch":
        return colors.accents.blue.main;
      case "fork":
        return colors.accents.purple.main;
      default:
        return colors.text.tertiary;
    }
  };

  const Icon = getActivityIcon(activity.type);
  const iconColor = getActivityColor(activity.type);

  return (
    <>
      <View className="flex-row items-center p-4">
        <View
          className="w-8 h-8 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: `${iconColor}20` }}
        >
          <Icon size={16} color={iconColor} />
        </View>

        <View className="flex-1">
          <Text
            className="font-medium text-sm"
            style={{ color: colors.text.primary }}
          >
            {activity.title}
          </Text>
          <Text
            className="text-xs mt-1"
            style={{ color: colors.text.secondary }}
          >
            {activity.repository} • {activity.timestamp}
          </Text>
        </View>
      </View>

      {showDivider && (
        <View
          className="h-px mx-4"
          style={{ backgroundColor: colors.border.primary }}
        />
      )}
    </>
  );
};

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  onViewAll,
}) => {
  const { colors } = useModernTheme();

  return (
    <View className="px-6 mb-6">
      <View className="flex-row items-center justify-between mb-4">
        <Text
          className="text-xl font-semibold"
          style={{ color: colors.text.primary }}
        >
          Recent Activity
        </Text>

        <TouchableOpacity onPress={onViewAll}>
          <Text
            className="text-sm font-medium"
            style={{ color: colors.interactive.primary }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <View
        className="rounded-modern-lg border"
        style={{
          backgroundColor: colors.surface.secondary,
          borderColor: colors.border.primary,
        }}
      >
        {activities.slice(0, 4).map((activity, index) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            showDivider={index < activities.length - 1 && index < 3}
          />
        ))}
      </View>
    </View>
  );
};
