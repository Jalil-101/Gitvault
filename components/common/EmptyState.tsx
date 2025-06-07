// components/common/EmptyState.tsx
import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = "folder-open-outline",
}) => {
  const { colors } = useTheme();

  return (
    <View className="flex-1 items-center justify-center px-4">
      <View className="w-20 h-20 rounded-full bg-github-light-canvas-inset dark:bg-github-dark-canvas-inset items-center justify-center mb-6 border border-github-light-border-muted dark:border-github-dark-border-muted">
        <Ionicons name={icon} size={40} color={colors.fg.muted} />
      </View>

      <Text className="text-github-light-fg-default dark:text-github-dark-fg-default text-xl font-semibold mb-3 text-center">
        {title}
      </Text>

      <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-base text-center leading-6">
        {description}
      </Text>
    </View>
  );
};
