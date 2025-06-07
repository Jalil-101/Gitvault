import React from "react";
import { View, Text } from "react-native";

interface ExploreHeaderProps {
  children: React.ReactNode;
}

export const ExploreHeader: React.FC<ExploreHeaderProps> = ({ children }) => {
  return (
    <View className="bg-github-light-canvas-default dark:bg-github-dark-canvas-default border-b border-github-light-border-default dark:border-github-dark-border-default">
      <View className="px-4 pt-4 pb-2">
        <Text className="text-2xl font-bold text-github-light-fg-default dark:text-github-dark-fg-default mb-1">
          Explore
        </Text>
        <Text className="text-sm text-github-light-fg-muted dark:text-github-dark-fg-muted mb-4">
          Discover what the Devault community is building
        </Text>
      </View>
      {children}
    </View>
  );
};
