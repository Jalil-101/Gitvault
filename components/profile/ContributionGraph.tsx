// components/profile/ContributionGraph.tsx
import React from "react";
import { View, Text } from "react-native";

interface ContributionGraphProps {
  contributions: number;
  formatNumber: (num: number) => string;
}

export const ContributionGraph: React.FC<ContributionGraphProps> = ({
  contributions,
  formatNumber,
}) => {
  return (
    <View className="mx-6 mb-6">
      <View className="bg-github-light-canvas-overlay dark:bg-github-dark-canvas-overlay border border-github-light-border-default dark:border-github-dark-border-default rounded-2xl p-6">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-github-light-fg-default dark:text-github-dark-fg-default font-bold text-lg">
            {formatNumber(contributions)} contributions
          </Text>
          <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-sm">
            last year
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-1">
          {Array.from({ length: 84 }).map((_, index) => (
            <View
              key={index}
              className={`w-3 h-3 rounded ${
                Math.random() > 0.7
                  ? "bg-github-light-success-emphasis dark:bg-github-dark-success-emphasis"
                  : Math.random() > 0.5
                  ? "bg-github-light-success-muted dark:bg-github-dark-success-muted"
                  : Math.random() > 0.3
                  ? "bg-github-light-border-muted dark:bg-github-dark-border-muted"
                  : "bg-github-light-border-subtle dark:bg-github-dark-border-subtle"
              }`}
            />
          ))}
        </View>
      </View>
    </View>
  );
};
