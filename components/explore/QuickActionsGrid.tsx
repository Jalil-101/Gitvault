// components/explore/QuickActionsGrid.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Search,
  GitBranch,
  Users,
  Book,
  Zap,
  Code,
  Star,
  TrendingUp,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useModernTheme } from "@/context/ThemeContext";

interface QuickAction {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: readonly string[];
}

const quickActions: QuickAction[] = [
  {
    id: "trending",
    title: "Trending",
    icon: TrendingUp,
    color: "green",
    gradient: ["#10B981", "#059669"],
  },
  {
    id: "repositories",
    title: "Repositories",
    icon: Book,
    color: "blue",
    gradient: ["#3B82F6", "#2563EB"],
  },
  {
    id: "users",
    title: "Users",
    icon: Users,
    color: "purple",
    gradient: ["#8B5CF6", "#A855F7"],
  },
  {
    id: "topics",
    title: "Topics",
    icon: Code,
    color: "orange",
    gradient: ["#F97316", "#EA580C"],
  },
  {
    id: "stars",
    title: "Stars",
    icon: Star,
    color: "red",
    gradient: ["#EF4444", "#DC2626"],
  },
  {
    id: "awesome",
    title: "Awesome",
    icon: Zap,
    color: "indigo",
    gradient: ["#6366F1", "#4F46E5"],
  },
];

interface QuickActionsGridProps {
  onActionPress?: (actionId: string) => void;
}

export const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({
  onActionPress,
}) => {
  const { colors, shadows } = useModernTheme();

  return (
    <View className="mb-6">
      {/* Section Header */}
      <View className="px-5 mb-5">
        <Text
          className="text-lg font-semibold leading-6"
          style={{ color: colors.text.primary }}
        >
          Quick Actions
        </Text>
        <Text
          className="text-sm font-medium mt-0.5"
          style={{ color: colors.text.secondary }}
        >
          Explore GitHub content
        </Text>
      </View>

      {/* Actions Grid */}
      <View className="px-4">
        <View className="flex-row flex-wrap justify-between">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <TouchableOpacity
                key={action.id}
                onPress={() => onActionPress?.(action.id)}
                className="rounded-2xl mb-5"
                style={{
                  width: "31%",
                  aspectRatio: 1,
                  backgroundColor: colors.surface.primary,
                  borderColor: `${action.gradient[0]}20`,
                  borderWidth: 2,
                  ...shadows.md,
                }}
              >
                {/* Background Gradient */}
                <LinearGradient
                  colors={[
                    `${action.gradient[0]}05`,
                    `${action.gradient[1]}05`,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="absolute inset-0 rounded-2xl"
                />

                <View className="flex-1 items-center justify-center px-3 py-4">
                  {/* Icon Container */}
                  <View
                    className="rounded-2xl items-center justify-center mb-3"
                    style={{
                      width: 56,
                      height: 56,
                      backgroundColor: colors.surface.secondary,
                      borderWidth: 2,
                      borderColor: `${action.gradient[0]}20`,
                      ...shadows.sm,
                    }}
                  >
                    <LinearGradient
                      colors={[
                        `${action.gradient[0]}15`,
                        `${action.gradient[1]}15`,
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      className="absolute inset-0 rounded-2xl"
                    />
                    <View
                      className="rounded-xl items-center justify-center"
                      style={{
                        width: 36,
                        height: 36,
                        backgroundColor: `${action.gradient[0]}20`,
                      }}
                    >
                      <IconComponent size={20} color={action.gradient[0]} />
                    </View>
                  </View>

                  {/* Action Title */}
                  <Text
                    className="text-xs font-semibold text-center leading-4 mb-2"
                    style={{ color: colors.text.primary }}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    {action.title}
                  </Text>

                  {/* Accent Line */}
                  <View
                    className="h-0.5 rounded-full"
                    style={{
                      backgroundColor: action.gradient[0],
                      width: 24,
                    }}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};
