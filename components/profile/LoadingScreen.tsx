// components/LoadingScreen.tsx
import React from "react";
import { View, Animated, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";

interface LoadingScreenProps {
  scaleAnim: Animated.Value;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ scaleAnim }) => {
  const { theme, colors } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-github-light-canvas-subtle dark:bg-github-dark-canvas-default">
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={
          theme === "dark" ? colors.canvas.default : colors.canvas.subtle
        }
      />
      <View className="flex-1 items-center justify-center">
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
          }}
          className="items-center"
        >
          <View className="w-20 h-20 bg-github-light-border-muted dark:bg-github-dark-border-muted rounded-full animate-pulse mb-4" />
          <View className="w-32 h-4 bg-github-light-border-muted dark:bg-github-dark-border-muted rounded animate-pulse mb-2" />
          <View className="w-24 h-3 bg-github-light-border-muted dark:bg-github-dark-border-muted rounded animate-pulse" />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};
