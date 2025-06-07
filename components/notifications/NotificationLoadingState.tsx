// components/notifications/NotificationLoadingState.tsx
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";

export const NotificationLoadingState: React.FC = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-github-light-canvas-subtle dark:bg-github-dark-canvas-default">
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.accentBlue} />
        <Text className="mt-4 text-github-light-fg-muted dark:text-github-dark-fg-muted">
          Loading notifications...
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default NotificationLoadingState;
