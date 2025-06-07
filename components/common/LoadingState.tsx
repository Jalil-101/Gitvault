// components/common/LoadingState.tsx
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useTheme } from "@/context/ThemeContext";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
}) => {
  const { colors } = useTheme();

  return (
    <View className="flex-1 items-center justify-center px-4">
      <ActivityIndicator size="large" color={colors.accent.fg} />
      <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-base mt-4 text-center">
        {message}
      </Text>
    </View>
  );
};
