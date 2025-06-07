// components/common/ErrorState.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  const { colors } = useTheme();

  return (
    <View className="flex-1 items-center justify-center px-4">
      <View className="w-16 h-16 rounded-full bg-github-light-danger-subtle dark:bg-github-dark-danger-subtle items-center justify-center mb-4">
        <Ionicons name="alert-circle" size={32} color={colors.danger.fg} />
      </View>

      <Text className="text-github-light-fg-default dark:text-github-dark-fg-default text-lg font-semibold mb-2 text-center">
        Something went wrong
      </Text>

      <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-base mb-6 text-center">
        {error}
      </Text>

      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="bg-github-light-accent-fg dark:bg-github-dark-accent-fg px-6 py-3 rounded-lg"
          activeOpacity={0.8}
        >
          <Text className="text-white font-medium">Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
