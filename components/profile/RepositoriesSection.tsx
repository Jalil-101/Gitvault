// components/profile/RepositoriesSection.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RepositoryCard } from "./RepositoryCard";
import { Repository } from "@/types/profile";

interface RepositoriesSectionProps {
  repositories: Repository[];
  formatNumber: (num: number) => string;
  getLanguageColor: (language: string) => string;
}

export const RepositoriesSection: React.FC<RepositoriesSectionProps> = ({
  repositories,
  formatNumber,
  getLanguageColor,
}) => {
  return (
    <View className="px-6 pb-8">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-github-light-fg-default dark:text-github-dark-fg-default font-bold text-xl">
          Popular repositories
        </Text>
        <TouchableOpacity>
          <Text className="text-github-light-accent-emphasis dark:text-github-dark-accent-emphasis font-medium">
            View all
          </Text>
        </TouchableOpacity>
      </View>

      {repositories.map((repo, index) => (
        <RepositoryCard
          key={repo.id}
          repo={repo}
          index={index}
          formatNumber={formatNumber}
          getLanguageColor={getLanguageColor}
        />
      ))}
    </View>
  );
};
