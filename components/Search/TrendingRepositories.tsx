// components/TrendingRepositories.tsx
import React from "react";
import { View, Text } from "react-native";
import { Repository } from "@/types/search";
import { RepositoryCard } from "./RepositoryCard";

interface TrendingRepositoriesProps {
  repositories: Repository[];
  onRepositoryPress?: (repository: Repository) => void;
}

export const TrendingRepositories: React.FC<TrendingRepositoriesProps> = ({
  repositories,
  onRepositoryPress,
}) => {
  if (repositories.length === 0) return null;

  return (
    <View className="mx-4">
      <Text className="text-github-light-fg-default dark:text-github-dark-fg-default font-semibold text-lg mb-3">
        Trending Repositories
      </Text>
      {repositories.map((repo) => (
        <RepositoryCard
          key={repo.id}
          repository={repo}
          onPress={onRepositoryPress}
          showOwner
        />
      ))}
    </View>
  );
};
